    jQuery(function ($) {
        'use strict';


        function parseiconenmenu(ul, menu) {
          console.log(menu);
            for (var i = 0; i < menu.length; i++) {

                if (menu[i].link == cluster) {
                    categorie_naam = menu[i].name;



                    for (var j = 0; j < menu[i].sub.length - 1; j++) {

                        var subcategorietekst = categorie + "-" + subcategorie;
                        if (menu[i].sub[j].link == subcategorietekst) {
                            var li = $(ul).append('<li style=\'background-image:url("' + menu[i].sub[j].image + '"); background-color:' + menu[i].sub[j].color3 + ';\' title="' + menu[i].sub[j].name + '" iconurl="' + menu[i].sub[j].image + '" id="' + menu[i].sub[j].name + '" class="ulmenu selected" >&nbsp;</li>');

                            loadGeometry(jsonData, menu[i].sub[j].name, menu[i].sub[j].image, menu[i].sub[j].color3);

                        } else {
                            var li = $(ul).append('<li style=\'background-image:url("' + menu[i].sub[j].image + '"); background-color:' + menu[i].sub[j].color2 + ';\' title="' + menu[i].sub[j].name + '" iconurl="' + menu[i].sub[j].image + '" id="' + menu[i].sub[j].name + '" class=ulmenu >&nbsp;</li>');
                        }
                        menukleur2 = menu[i].sub[j].color2;
                        menukleur3 = menu[i].sub[j].color3;
                        icoon1 = menu[i].sub[j].image;

                    }

                    if (subcategorie == menu[i].sub.length - 1) {
                        $(".ulmenu").toggleClass("selected");
                        $(".ulmenu").css("background-color", menukleur3);
                        $("#Home").toggleClass("selected");
                        $("#Home").css("background-color", menukleur2);

                    }


                    $(".ulmenu").click(function () {

                        var icoon_naam = $(this).attr('title');
                        var icoon_url = $(this).attr('iconurl');
                        var icoon_kleur = $(this).attr('menukleur2');

                        $("#title").html(icoon_naam);

                        if ($(this).attr('title') == "Home") {
                            var url = "../index.html";
                            window.location.replace(url);
                        } else {
                            if ($(this).hasClass("selected")) {
                                $(this).toggleClass("selected");

                                if ($(this).attr('title') == "Edit") {
                                    $("#venster").hide();
                                    $(this).css("background-color", '#ff660e');

                                }

                                if ($(this).attr('title') == "Voorspelmodel") {
                                    this_map.removeLayer(lagen.voorspelmodel);
                                    $(this).css("background-color", menukleur2);
                                }/*

                                if ($(this).attr('title') == "Seinen") {
                                    this_map.removeLayer(lagen.seinen);
                                    $(this).css("background-color", menukleur2);
                                }*/

                                if ($(this).attr('title') == "Spooras") {
                                    this_map.removeLayer(lagen.spooras);
                                    $(this).css("background-color", menukleur2);
                                }

                                if ($(this).attr('title') == "Kunstwerken") {
                                    this_map.removeLayer(lagen.kunstwerk);
                                    $(this).css("background-color", menukleur2);
                                }

                                if ($(this).attr('title') == "Wissels") {
                                    this_map.removeLayer(lagen.wissels);
                                    $(this).css("background-color", menukleur2);
                                }

                                if ($(this).attr('title') == "Overwegen") {
                                    this_map.removeLayer(lagen.overwegen);
                                    $(this).css("background-color", menukleur2);
                                }

                                if ($(this).attr('title') == "ZKL-RC") {
                                    this_map.removeLayer(lagen.zkl);
                                    $(this).css("background-color", menukleur2);
                                }

                                if ($(this).attr('title') == "Kilometrering") {
                                    this_map.removeLayer(lagen.kilometrering);
                                    $(this).css("background-color", menukleur2);
                                }

                                if ($(this).attr('title') == "Luchtfoto") {
                                    this_map.removeLayer(lagen.luchtfoto);
                                    $(this).css("background-color", menukleur2);
                                }
                                /*zet_layer_aan_of_uit( icoon_naam );*/


                            } else if ($(this).attr('title') == "Edit") {
                                $(this).toggleClass("selected");

                                $(this).css("background-color", menukleur3);


                                $("#venster").show();



                            } else if ($(this).attr('title') == "Voorspelmodel") {
                                $(this).toggleClass("selected");

                                $(this).css("background-color", menukleur3);


                                lagen.voorspelmodel.addTo(this_map);

                            } else if ($(this).attr('title') == "Seinen") {
                                $(this).toggleClass("selected");

                                $(this).css("background-color", menukleur3);


                                lagen.seinen.addTo(this_map);

                            } else if ($(this).attr('title') == "Spooras") {
                                $(this).toggleClass("selected");

                                $(this).css("background-color", menukleur3);


                                lagen.spooras.addTo(this_map);

                            } else if ($(this).attr('title') == "Kunstwerken") {
                                $(this).toggleClass("selected");

                                $(this).css("background-color", menukleur3);

                                lagen.kunstwerk.addTo(this_map);

                            } else if ($(this).attr('title') == "Wissels") {
                                $(this).toggleClass("selected");

                                $(this).css("background-color", menukleur3);


                                lagen.wissels.addTo(this_map);

                            } else if ($(this).attr('title') == "Overwegen") {
                                $(this).toggleClass("selected");

                                $(this).css("background-color", menukleur3);


                                lagen.overwegen.addTo(this_map);

                            } else if ($(this).attr('title') == "ZKL-RC") {
                                $(this).toggleClass("selected");

                                $(this).css("background-color", menukleur3);


                                lagen.zkl.addTo(this_map);

                            } else if ($(this).attr('title') == "Kilometrering") {
                                $(this).toggleClass("selected");

                                $(this).css("background-color", menukleur3);


                                lagen.kilometrering.addTo(this_map);

                            } else if ($(this).attr('title') == "Luchtfoto") {
                                $(this).toggleClass("selected");

                                $(this).css("background-color", menukleur3);


                                lagen.luchtfoto.addTo(this_map);


                                /*loadGeometry(  jsonData , icoon_naam , icoon_url, icoon_kleur);*/
                            }
                            else if ($(this).attr('title') == "Profile") {
                              $(this).toggleClass("selected");

                              $(this).css("background-color", menukleur3);



                              window.location.href =  '../redirect.php';
                              /*loadGeometry(  jsonData , icoon_naam , icoon_url, icoon_kleur);*/
                          }
                        }
                    });
                }
            }
        }

      //  var wfstbestand = "../kaart/services/wfst.php";

        /*$.ajax({
                    type: "POST",
                    url: wfstbestand,
                    async: false,
                    dataType: 'json',
                    success: function (data) {
                        jsonData=data;

                    },
            error: function (data) {
                alert("error!");
                console.log(data);
            }
        });*/

        /**
        var filename = "../data/voorzieningen.json";


        $.ajax({
          type: 'GET',
          url: filename,
          //data: data,
          async: false,
          beforeSend: function (xhr) {
            if (xhr && xhr.overrideMimeType) {
              xhr.overrideMimeType('application/json;charset=utf-8');
            }
          },
          dataType: 'json',
          success: function (data) {


              jsonData=data;

          },
          error: function (data) {
                alert( "error!");
                 console.log( data  );


          }
        });
        **/


        var jsonData;

        var iconenmenu = $('#iconenmenu');
        parseiconenmenu(iconenmenu, JSON_knoppen.menu);

/*        var sheet = document.createElement('style')
        sheet.innerHTML = ".icooncirkel {border-radius: 50%; background-color:" + menukleur2 + "; border: 1px solid #FFFFFF;} .popupkleur {background-color:" + menukleur2 + ";} #venster {border-top: 10px solid " + menukleur2 + "; box-shadow: 0px 0px 3px 2px;} .tablestyle {border:0px;} .trstyle:nth-child(odd){background-color: #fff;} .trstyle:nth-child(even){background-color: #fff;} .tdstyle_l{border: 2px solid white; box-shadow: 0 5px 5px rgba(182, 182, 182, 0.75);} .tdstyle_r{border: 2px solid white; box-shadow: 0 5px 5px rgba(182, 182, 182, 0.75);} ";
        document.body.appendChild(sheet);*/

        $(".clearfix li").each(function (index) {

            if ($(this).attr('title')) {

            }

        });


        // -------------------------------------------------------------
        //   Basic Navigation
        // -------------------------------------------------------------
        (function () {
            var $frame = $('#basic');
            var $slidee = $frame.children('ul').eq(0);
            var $wrap = $frame.parent();

            // Call Sly on frame
            $frame.sly({
                horizontal: 1,
                itemNav: 'basic',
                smart: 1,
                activateOn: 'click',
                mouseDragging: 1,
                touchDragging: 1,
                releaseSwing: 1,
                startAt: 0,
                scrollBar: $wrap.find('.scrollbar'),
                scrollBy: 1,
                pagesBar: $wrap.find('.pages'),
                activatePageOn: 'click',
                speed: 500,
                elasticBounds: 1,
                easing: 'easeOutExpo',
                dragHandle: 1,
                dynamicHandle: 1,
                clickBar: 1,

                // Buttons
                forward: $wrap.find('.forward'),
                backward: $wrap.find('.backward'),
                prev: $wrap.find('.prev'),
                next: $wrap.find('.next'),
                prevPage: $wrap.find('.prevPage'),
                nextPage: $wrap.find('.nextPage')
            });
            setTimeout(function () {
                $frame.sly('toEnd');
            }, 1000);
            setTimeout(function () {
                $frame.sly('toStart');
            }, 2000);


            // To Start button
            $wrap.find('.toStart').on('click', function () {
                var item = $(this).data('item');
                // Animate a particular item to the start of the frame.
                // If no item is provided, the whole content will be animated.
                $frame.sly('toStart', item);
            });

            // To Center button
            $wrap.find('.toCenter').on('click', function () {
                var item = $(this).data('item');
                // Animate a particular item to the center of the frame.
                // If no item is provided, the whole content will be animated.
                $frame.sly('toCenter', item);
            });

            // To End button
            $wrap.find('.toEnd').on('click', function () {
                var item = $(this).data('item');
                // Animate a particular item to the end of the frame.
                // If no item is provided, the whole content will be animated.
                $frame.sly('toEnd', item);
            });

            // Add item
            $wrap.find('.add').on('click', function () {
                $frame.sly('add', '<li>' + $slidee.children().length + '</li>');
            });

            // Remove item
            $wrap.find('.remove').on('click', function () {
                $frame.sly('remove', -1);
            });
        }());



    });
