$(document).ready(function() {

  // make an array with all the Twitch channels given in example code
  var channels = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","brunofin","comster404","test_channel","cretetion","sheevergaming","TR7K","OgamingSC2","ESL_SC2"];

  // check which ones are online
  // get the relevant information of each channel and push it in an object
  // link to channel, live stream details, display name, thumbnail

  for (var i = 0; i < channels.length; i++) {
    var titleChannel = channels[i];

    var onlineURL = "https://api.twitch.tv/kraken/streams/";
    var channelURL = "https://api.twitch.tv/kraken/channels/";

    $.when($.getJSON(onlineURL + channels[i]), $.getJSON(channelURL + channels[i]))

    .done(function(a1, a2) {
      a2 = a2[0];
      a1 = a1[0];
      console.log(a2);
      var online = a1.stream;
      var link = a2.url;
      var details = a2.status;
      var displayname = a2.display_name;
      var thumbnail = a2.logo;
      var statusimage;

      // exceptions
      if (thumbnail == null) {
        thumbnail = "http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_300x300.png";
      }
      if (online == null) {
        details = "Not streaming at the moment.";
        statusimage = "fa-circle";
      } else statusimage = "fa-check-circle";

      // html code
      var html = "\
      <div class=\"media\">\
        <div class=\"media-left\">\
          <a href=\"" + link + "\">\
          <img class=\"media-object img-circle\" src=\"" + thumbnail + "\" alt=\"...\">\
          </a>\
      </div>\
      <div class=\"media-body\">\
        <a href=\"" + link + "\">\
        <h4 class=\"media-heading\">" + displayname + "</h4>\
        <p class=\"describing\">" + details + "</p>\
        </a>\
      </div>\
      <div class=\"media-right\">\
          <i class=\"fa " + statusimage + " fa-3x\"></i>\
      </div>\
      </div>";

      if (online == null) {
        // when the channel is not online
        $("#offline").append(html);
      } else {
        // when  the channel is online
        $("#online").append(html);
      }

      $("#all").append(html);
    })

    .fail(function() {
      // when channel is no longer available
      var html = "\
      <div class=\"media disabled\">\
        <div class=\"media-left\">\
          <img class=\"media-object img-circle nonavailable\" src=\"http://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_300x300.png\" >\
      </div>\
      <div class=\"media-body\">\
        <h4 class=\"media-heading\">" + titleChannel + "</h4>\
        <p class=\"describing\">No longer available.</p>\
      </div>\
      <div class=\"media-right\">\
          <i class=\"fa fa-question-circle fa-3x\"></i>\
      </div>\
      </div>";
      
      $("#all").append(html);
    });

  }

});
