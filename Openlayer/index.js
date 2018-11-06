import $ from 'jquery';

$(function () {

    function parseMenu(ul, menu) {
        for (var i = 0; i < menu.length; i++) {
            var li = ul.append('<li><a href="/map/index.html" onclick="openmenu(\'' + menu[i].link + '\');" style="' + menu[i].color + '"> <img src="' + menu[i].image + '" align="left" style="' + menu[i].style + '"> &nbsp;' + menu[i].name + '</a></li>');

            if (menu[i].sub != null) {
                var subul = $('<ul class="submenu" id="submenu' + menu[i].link + '"></ul>');
                $(li).append(subul);
                parseMenu($(subul), menu[i].sub);
            }

        }
    }

    var menu = $('#menu');

    parseMenu(menu, JSON_knoppen.menu);
});

function openmenu(menunummer) {
  if (menunummer == '2020') {
    var url = "auth.php"
  } else
   var url = "kaart/index.html?jaarplan=" + menunummer;
   window.location.replace(url);
}
