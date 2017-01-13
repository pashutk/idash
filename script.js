function request(url, cb, opt_timeout) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onabort = function (e) {
    var error = new Error('No connection');
    cb(error);
  };

  xmlhttp.onreadystatechange = function() {
    var data, error;
    if (this.readyState == 4 && this.status == 200) {
      try {
        data = JSON.parse(this.responseText);
      } catch(err) {
        cb(err);
        return;
      }
      
      if (data.error) {
        error = new Error(data.error);
        cb(error);
        return;
      }

      cb(null, data);
    } else if (this.readyState == 4 && this.status == 0) {
      error = new Error('No connection');
      cb(error);
    } else if (this.readyState == 4) {
      error = new Error('XMLHttpRequest error');
      cb(error);
    }
  };
  xmlhttp.open("GET", url, true);
  // ontimeout isn't working on old safari (6.1.6 ios)
  // xmlhttp.timeout = opt_timeout || 4000;
  setTimeout(function() {
    if (xmlhttp.readyState >0 && xmlhttp.readyState < 4) {
      xmlhttp.abort();
    }
  }, opt_timeout || 4000);
  xmlhttp.send();
}

function fetchIP() {
  request('/ip', function(err, data) {
    var el = document.getElementById('ip');
    if (err && err.message == 'No connection') {
      el.innerText = 'No connection';
      el.style.backgroundColor = 'red';
      return;
    } else if (err && !data.ip) {
      alert(err);
      return;
    }

    el.innerText = data.ip;
    el.style.backgroundColor = greenIPs.indexOf(data.ip) != -1 ? 'green' : 'red';
  });
}

function fetchWeatherForecast() {
  request('/wf', function(err, data) {
    var el = document.getElementById('temp');
    if (err && err.message == 'No connection') {
      el.innerText = 'No connection';
      return;
    } else if (err && !data.main) {
      alert(err);
      return;
    }

    el.innerText = data.main.temp;
  });
}

// =========================

var greenIPs = [
  // place green ips here
];

fetchIP();
fetchWeatherForecast();

setInterval(fetchIP, 5000);
setInterval(fetchWeatherForecast, 15 * 60 * 1000);
