const Request = function(url) {
  this.url = url;
};

Request.prototype.get = function(onComplete) {
  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.setRequestHeader("X-Auth-Token", 'b7e21c920c9b4df59d1b43059033d36c')
  request.addEventListener('load', function() {
    if(this.status !== 200) {
      return;
    }

    const responseBody = JSON.parse(this.responseText);
    onComplete(responseBody);
  });
  request.send();
};

module.exports = Request;
