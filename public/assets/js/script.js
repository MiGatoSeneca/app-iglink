var appPath = "https://iglink.co";
var apiPath = "https://api-iglink.azurewebsites.net";
var wwwPath = "https://www.iglink.co";
var adminPath = "https://admin.iglink.co";

console.log("done...");

if(document.location.origin == "http://localhost:3000"){
  appPath = "http://localhost:3000";
  apiPath = "http://localhost:3001";
  wwwPath = "http://localhost:3002";
  adminPath = "http://localhost:3003";
}


var posts_count=0;
var ads_count=0;

$(document).ready(function(){
  getPosts(0);
});
var scroll_handeler = false;
var loading_posts = true;
function getPosts(max_id){
  loading_posts=true;
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: apiPath+"/app/posts/"+brand+"/"+max_id,
    error: function(data, textStatus, jqXHR) {
    },
    success: function(data) {
      for ( var post of data.posts){
        var html = "";
        html += "<div class='col-md-4 col-xs-4 text-center p-15 p-xs-5 fade-in'>";
        html += " <a href='javascript:redirection(\""+post.url+"\",\"post\",\""+post.id+"\")'>";
        html += "   <img src='"+post.thumbnail_src+"' class='width-100per' alt='Link #"+post.count+" "+data.brand+"'>";
        html += " </a>";
        html += "</div>";
        $("#posts").append(html);
        posts_count++;
      }
      getPosts(data.last_id);
    }
  });
}

function redirection(url,clickType,clickId){
  ga('send', 'event', 'redirection', 'redirection_success', brand);
  console.log("ga('send', 'event', 'redirection', 'redirection_success', "+brand+");");
  $.ajax({
    type: 'GET',
    dataType: 'json',
    url: apiPath+"/app/click/"+brand+"/"+clickType+"/"+clickId,
    error: function(data, textStatus, jqXHR) {
      ga('send', 'event', 'server', 'clickAdd_error', brand+"/"+clickType+"/"+clickId);

    },
    success: function(data) {
      ga('send', 'event', 'server', 'clickAdd_success', brand+"/"+clickType+"/"+clickId);
    }
  });
  window.location.href=url;
}


ga('send', 'event', 'visit', 'visit_success', brand);

$.ajax({
  type: 'GET',
  dataType: 'json',
  url: apiPath+"/app/visit/"+brand,
  error: function(data, textStatus, jqXHR) {
    ga('send', 'event', 'server', 'visitAdd_error', brand);
  },
  success: function(data) {
    ga('send', 'event', 'server', 'visitAdd_success', brand);
  }
});
