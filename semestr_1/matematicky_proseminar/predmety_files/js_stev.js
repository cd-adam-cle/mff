var dl_root;
var sis_timer;

/* Získání šířky skrytého elementu v jQuery */
$.fn.getHiddenOuterWidth = function () {
    // save a reference to a cloned element that can be measured
    var $hiddenElement = $(this).clone().appendTo('body');

    // calculate the width of the clone
    var width = $hiddenElement.outerWidth();

    // remove the clone from the DOM
    $hiddenElement.remove();

    return width;
};


/**
 * Funkce pro kontrolu a opravení html
 * @param string html HTML text
 * @param string[] povoleneTagy Seznam povolených empty tagů nad rámec běžných (např. tagy z langů)
 * @returns {{problems: string[], html: string, fixed: boolean}}
 */
function dl_html_tidy(html,povoleneTagy)
{
   var r = {problems: ["Error: Cannot call remote service"], html: html, fixed: false};
   $.ajax({
       async: false,
       url: dl_root+"/stev/rest.php",
       data: {
           'do': "html_tidy",
           id: dl_id,
           tid: dl_tid,
           data: html,
           tag: povoleneTagy
       },
       success: function(result){
           r = result;
       }
   });
   return r;
}

function dl_get_percent_width(element)
{
      return $(element).clone().appendTo('body').wrap('<div style="display: none"></div>').css('width');
}


/* Získání CSS šířky i skrytého elementu v jQuery */
$.fn.getHiddenCssWidth = function () {
   var width = dl_get_percent_width(this);

   if(width.indexOf("%") == -1)
   {
         width = $(this).css('width');
   }

   if(width == "0px")
   {
         width = dl_get_percent_width(this);
         if(width == "0px")
         {
            // save a reference to a cloned element that can be measured
            var $hiddenElement = $(this).clone().appendTo('body');

            // calculate the width of the clone
            width = $hiddenElement.css("width");

            // remove the clone from the DOM
            $hiddenElement.remove();
         }
   }

    return width;
};


/**
 *
 * @param {string} formName
 * @param {string} formSelector
 * @returns {any[]|*|null|string[]}
 */
function dl_form_value(formName, formSelector = null) {

    const scope = formSelector
        ? document.querySelector(formSelector)
        : document;

    if (!scope) return null;


    let elements = [];

    const namesToTry = [formName];

    // pokud nemá [], zkus i variantu s []
    if (!formName.endsWith('[]')) {
        namesToTry.push(formName + '[]');
    }

    // pokud má [], zkus i variantu bez []
    if (formName.endsWith('[]')) {
        namesToTry.push(formName.slice(0, -2));
    }

    for (const nm of namesToTry) {
        elements = scope.querySelectorAll(`[name="${nm}"]`);
        if (elements.length) break; // vezmeme první nalezenou shodu
    }

    if (!elements.length) return null;

    const first = elements[0];
    const type = first.type;

    // RADIO
    if (type === 'radio') {
        const checked = Array.from(elements).find(el => el.checked);
        return checked ? checked.value : null;
    }

    // CHECKBOX
    if (type === 'checkbox') {
        return Array.from(elements)
            .filter(el => el.checked)
            .map(el => el.value);
    }

    // SELECT
    if (first.tagName === 'SELECT') {
        if (first.multiple) {
            return Array.from(first.selectedOptions).map(o => o.value);
        }
        return first.value;
    }

    // INPUT text / hidden / number / etc.
    return first.value;
}

function getE(obj_id)
{
   if (typeof obj_id != "string")
   {
         return obj_id;
   }
   else if (Boolean(document.getElementById))
   {
         if (document.getElementById(obj_id))
         {
               if (document.getElementById(obj_id).getAttribute("id")!=obj_id) // prvek s hledanym id nema hledane id, tak hlouply muze byt snad jen explorer
               {
                     if (Boolean(document.all)) // ujisteni ze podporujeme pozadovanou funkci
                     {
                           for(var i=1;i<document.all[obj_id].length;i++)
                           {
                                 if(document.all[obj_id][i].id == obj_id)
                                 {
                                 	return document.all[obj_id][i];
                                 }
                           }
                     }
               }
               else
               {
                     return document.getElementById(obj_id);
               }
         }
   }

   if (Boolean(document.all)) // neproslo getElementById, hledame i jinde
   {
         return eval("document.all."+obj_id);
   }
   else if (Boolean(document.ids))
   {
         return eval("document.ids."+obj_id);
   }
   else
   {
         return null;
   }
}

// jquery extend function
$.extend(
{
   redirectPost: function(location, args)
   {
      var form = '';
      $.each( args, function( key, value )
      {
         form += '<input type=\"hidden\" name=\"'+key+'\" value=\"'+value+'\">';
      });
      $('<form action=\"'+location+'\" method=\"POST\">'+form+'</form>').appendTo('body').submit();
   }
});

/**
 * univerzalni getElementsByClassName
 * @param clsName    string   nazev css tridy
 * @param rodic      object   rodic ve kterem hledame [document]
 * @param tagNazev   string   typ tagu ve kterem hledame, typicky div, hledame li ve vsem pouzijeme hvezdicku [*]
 * @return prvky odpovidajici zadani
 */
dl_getElementsByClassName = function(clsName, rodic, tagNazev)
{
   if (rodic === undefined || rodic === false)
   {
      rodic = document;
   }

   if (tagNazev === undefined || tagNazev === false)
   {
      tagNazev = '*';
   }

   if (document.getElementsByClassName)
   {
      tmp = rodic.getElementsByClassName(clsName);

      if (tagNazev == '*')
      {
         return tmp;
      }
      else
      {
         els = [];
         if (tmp.length>0)
         {
            for (var i = 0; i < tmp.length; i++)
            {
               if (tmp[i].nodeName.toLowerCase() == tagNazev.toLowerCase())
               {
                  els.push(tmp[i]);
               }
            }
         }
         return els;
      }
   }
   else
   {
      var retVal = new Array();
      var elements = rodic.getElementsByTagName(tagNazev);
      for(var i = 0;i < elements.length;i++)
      {
         if(elements[i].className.indexOf(" ") >= 0)
         {
            var classes = elements[i].className.split(" ");
            for(var j = 0;j < classes.length;j++)
            {
               if(classes[j] == clsName)
               {
                  retVal.push(elements[i]);
               }
            }
         }
         else if (elements[i].className == clsName)
         {
            retVal.push(elements[i]);
         }
      }
      return retVal;
   }
}

function wo(link,name,attr,dat)
{
      if (getE(dat)!=null)
      {
            if (getE(dat).value != "")
            {
                  var sd = getE(dat).value;

                  while(sd.search(String.fromCharCode(10)) != -1)
                  {
                     sd = sd.replace(String.fromCharCode(10),"$");
                  }

                  if (sd.length < 1000) //dlouhe URL v prohlizeci nejde otevrit
                  {
                        link = link + "&sd=" + sd;

                        if (getE(dat+"_hash")!=null)
                        {
                              var sdh = getE(dat+"_hash").value;
                              link = link + "&sdh=" + sdh;
                        }
                  }
            }
      }
      var valadd = "";
      $(".form_dialog_multi_or_text[data-object='"+dat+"']").find("input[type=hidden]").each(function (i, e) {
          valadd+=e.value;
      });
      $dialog_or_texts = $(".form_dialog_multi_or_texts[data-object='"+dat+"']");
      $span_defs = $dialog_or_texts.find("span.defs");
      if ($span_defs.length > 0)
      {
          let kod_name = $span_defs.attr("data-kod");
          let text_definitions = $span_defs.attr("data-text-definition");
          $dialog_or_texts.find("input[name*='["+kod_name+"]']").each(function (i, e) {
          valadd+=e.value + ';mka;';
            });
      }





      if(valadd!="")
      {
            link = link + "&val=" + valadd;
      }

     nove_okno = window.open(link,name,attr);

     if (name != '')
     {
           nove_okno.focus();
     }
}

function dlg_clear(id,dlg_nazev)
{
   var nalezen = false;
   if (getE(id+"_nazev")!=null)
   {
         SetValKomu(id+"_nazev"," - ");
         nalezen = true;
   }

   if (getE(id)!=null)
   {
         SetValKomu(id,"");
         nalezen = true;
   }

   if(nalezen)
   {
         $.get(dl_root+"/stev/rest.php", {
                                             'do': "dialog_multi_clear",
                                             id: dl_id,
                                             tid: dl_tid,
                                             dlg_nazev: dlg_nazev,
                                             dlg_kod: id
                                         }, function (data) {

                                         });
         pie_autocomp_placeholder(id);
   }
}

function SetValKomu(komu,val)
{
   if (getE(komu).tagName=="INPUT" || getE(komu).tagName=="TEXTAREA")
   {
         getE(komu).value = val;
         dl_dispatchEvent("change",getE(komu));
   }
   else if (getE(komu).tagName=="SPAN" || getE(komu).tagName=="DIV")
   {
         getE(komu).innerHTML = val;
         dl_dispatchEvent("change",getE(komu));
   }
   else if (getE(komu).tagName=="SELECT")
   {
         $('#'+komu).val(val); //korektně funguje i pro select multiple
         dl_dispatchEvent("change",getE(komu));
   }

}


function dialog_multi_get_kody(dialog_kod)
{
   var kody = getE(dialog_kod).value;
   if(kody=="")
   {
         return [];
   }
   if(kody.length>0 && kody.charAt(kody.length-1)==";")
   {
         kody = kody.substr(0,kody.length-1);
   }
   return kody.split(";");
}

function dialog_multi_get_nazvy(dialog_kod)
{
   var nazvy = $("#"+dialog_kod+"_nazev").html();
   if(nazvy=="&nbsp;" || nazvy=="" || nazvy==" - ")
   {
         return [];
   }
   nazvy = $('<span>'+nazvy+'</span>');
   nazvy.find(".dialog_multi_remove").remove();
   nazvy.find(".dialog_multi_prepinace").remove();

   return nazvy.html().split("<br>");
}

function dialog_get_prepinace(dialog_kod)
{
    var prepinace_str = $("span[data-object="+dialog_kod+"]").attr("data-param_prepinace");
    if ((typeof prepinace_str) === "string")
    {
        if (prepinace_str === "[]")
        {
            return null;
        }
        return JSON.parse(prepinace_str);
    }
    return null;
}

function pie_add_dialog_remove(dlg_kod,dlg_nazev,in_change_event)
{
   if(!$("#"+dlg_kod).parent(".form_dialog").hasClass("param_odebirani"))
   {
         return;
   }
   var kody = dialog_multi_get_kody(dlg_kod);
   var nazvy = dialog_multi_get_nazvy(dlg_kod);

   var prepinace = dialog_get_prepinace(dlg_kod);
   let $prep_select;
   if (prepinace !== null)
   {
       $prep_select = $("<select class='inp2'/>");
       for (let prep_kod in prepinace) {
           if (prepinace.hasOwnProperty(prep_kod)) {
               let prep_title = prepinace[prep_kod] + " ["+prep_kod+"]";
               let $prep_option = $("<option/>").attr("value", prep_kod).html(prep_title);
               $prep_select.append($prep_option);
           }
       }
   }

   var nazvy_plus = "";
   for(var i=0;i<kody.length;i++)
   {
         if(nazvy_plus!="")
         {
               nazvy_plus += "<br>";
         }
         if ((typeof nazvy[i]) === "undefined")
         {
             nazvy_plus += dl_lang_id == "cs" ? "(nenalezeno)" : "(not found)";
         }
         else
         {
             nazvy_plus += nazvy[i];
         }

         if(!dl_pie)
         {
               if (prepinace !== null)
               {
                   let prepinac_hodnota = kody[i].substring(kody[i].indexOf("|") + 1);
                   $prep_select.find("option").removeAttr("selected");
                   $prep_select.find("option[value='"+prepinac_hodnota+"']").attr("selected", "selected");
                   nazvy_plus += ' <span class="dialog_multi_prepinace" data-kod="'+kody[i]+'">';
                   nazvy_plus += $prep_select.prop("outerHTML");
                   nazvy_plus += '</span>';
               }
               nazvy_plus += ' <span class="dialog_multi_remove" data-kod="'+kody[i]+'">';
               nazvy_plus += html_img('ico_minus.png',' width="14" height="14"','');
               nazvy_plus += '</span>';
         }
         else
         {
               nazvy_plus += '<span class="pieicon pieicon-ico_minus pieicon-small dialog_multi_remove" data-kod="'+kody[i]+'"></span>';
         }

   }
   if(nazvy_plus == "")
   {
         nazvy_plus = " - ";
   }
   $("#"+dlg_kod+"_nazev").html(nazvy_plus);
   $("#"+dlg_kod+"_nazev").find(".dialog_multi_remove").css({cursor:"pointer","font-size":"90%"}).on("click", function(){
      dialog_multi_remove(dlg_kod,dlg_nazev,$(this).attr("data-kod"));
   });
   $("#"+dlg_kod+"_nazev").find(".dialog_multi_prepinace select").on("change", function(){
       let nova_hodnota_prepinac = $(this).val();
       let hodnota_kod_a_prep = $(this).closest(".dialog_multi_prepinace").attr("data-kod");
       let hodnota_kod = hodnota_kod_a_prep.substring(0, hodnota_kod_a_prep.indexOf("|"));
       let nova_hodnota_kod_a_prep = hodnota_kod + "|" + nova_hodnota_prepinac;
       $("#"+dlg_kod+"_nazev [data-kod='" + hodnota_kod_a_prep + "']").attr("data-kod", nova_hodnota_kod_a_prep);
       let kody_a_prep = dialog_multi_get_kody(dlg_kod);
       for (let k = 0; k < kody_a_prep.length; k++)
       {
           if (kody_a_prep[k] === hodnota_kod_a_prep)
           {
               kody_a_prep[k] = nova_hodnota_kod_a_prep;
           }
       }

       $("#"+dlg_kod).val(kody_a_prep.join(";"));
   });
   if((typeof in_change_event) === "undefined")
   {
       dl_dispatchEvent("change", getE(dlg_kod));
   }
}

function dialog_multi_remove(dlg_kod, dlg_nazev, kod)
{
   var kody = dialog_multi_get_kody(dlg_kod);
   var nazvy = dialog_multi_get_nazvy(dlg_kod);
   var hashe = null;
   if(getE(dlg_kod+"_hash") !== null)
   {
       hashe = dialog_multi_get_kody(dlg_kod+"_hash");
   }
   var poradi = kody.indexOf(kod);
   if(poradi>-1)
   {
         kody.splice(poradi,1);
         nazvy.splice(poradi,1);
         if(hashe !== null)
         {
             hashe.splice(poradi,1);
         }

          $.get(dl_root+'/stev/rest.php', {
            kod: kod,
            'do': "dialog_multi_delete",
            id: dl_id,
            tid: dl_tid,
            dlg_nazev: dlg_nazev,
            dlg_kod: dlg_kod
        }, function (data) {
            $("#"+dlg_kod).val(kody.length==0?"":kody.join(";"));
            if(hashe !== null)
            {
               $("#" + dlg_kod + "_hash").val(hashe.length == 0 ? "" : hashe.join(";"));
            }
            $("#"+dlg_kod+"_nazev").html(nazvy.length==0?"":nazvy.join("<br />"));
            pie_add_dialog_remove(dlg_kod,dlg_kod);
            pie_autocomp_placeholder(dlg_kod);
        });

   }
}

function SetVal(kod,nazev,kod_val,nazev_val)
{
   if (nazev != "" && getE(nazev)!=null)
   {
         SetValKomu(nazev, nazev_val);
   }

   if (kod != ""   && getE(kod)!=null)
   {
         SetValKomu(kod, kod_val);
   }
}

function ParentSetVal(kod,nazev,kod_val,nazev_val,close)
{
   try
   {
         self.opener.SetVal(kod,nazev,kod_val,nazev_val);
   }
   catch(e)
   {
   }

   if (close=="a")
   {
      dl_self_close();
   }
}

/**
 * Používat místo self.close - kvůli pie designu v dialozích
 */
function dl_self_close()
{
   if(dl_pie && $("body").hasClass("window_dialog"))
   {
         $(parent.document).find(".generatedPopupClose").trigger("click");
   }
   else
   {
         self.close();
   }
}

function ParentRefresh(close)
{
   try
   {
         self.opener.document.location.reload(true);
   }
   catch(e)
   {
   }

   if (close=="a")
   {
         dl_self_close();
   }
}

function switch_filtr(filter_id)
{
   _div  = getE(filter_id);
   _href = getE("filtr_href_" + filter_id);

   if (_div == null || _href == null) return;

   if (_div.style.display == "")
   {
         _div.style.display = "none";
         _href.className = "filtr_off";
   }
   else
   {
         _div.style.display = "";
         _href.className = "filtr_on";
   }
}

function ShowHide(div,stav)
{
   var d = getE(div);
   var _stav = stav;

   if (d == null) return;

   if (stav == 3)
   {
         if (d.style.display == "") _stav = 0;
         else                       _stav = 1;
   }

   var $parNode = $(d.parentNode);

   if (_stav == 0)
   {
         d.style.visibility = "hidden";
         d.style.display    = 'none';
         if ($parNode.hasClass('dl_tipdiv'))
         {
               var addon = $parNode.attr("data-tip-addon");
               d.parentNode.firstChild.title = tip_show + ((typeof addon) !== "undefined" ? " - " + addon : "");
         }
         if (d.parentNode.id == 'dropdown_div')
         {
               d.parentNode.firstChild.title = dropdown_show;
         }
   }
   else
   {
         d.style.visibility = "visible";
         d.style.display    = '';
         if ($parNode.hasClass('dl_tipdiv'))
         {
               var addon = $parNode.attr("data-tip-addon");
               d.parentNode.firstChild.title = tip_hide + ((typeof addon) !== "undefined" ? " - " + addon : "");
         }
         if (d.parentNode.id == 'dropdown_div')
         {
               d.parentNode.firstChild.title = dropdown_hide;
         }
   }
}

/*global alert, document, window, class_session, getE, str_session_expired  */

/**
 *  Hlida vyprseni session
 *  @class class_session
 */
class_session = function()
{
   this.sessionCD       = 3600;  // vyprseni session
   this.timer           = null;  // reference na casovac
   this.interval        = 1000;  // interval skoku casovace [ms]
   this.notifyLimit     = 60;    // varovat pri vyprseni session
   this.refreshCD       = false; // jak casto se prodluzuje session
   this.sessionLifetime = 0;     // platnost session
   this.sessionPojistka = 30;    // pojistka - obnovovat x vterin predem
   this.started         = false; // pomocna promenna, zda je inicializovan
   this.allowExtend     = false;
   this.t1              = false; // pomocna promenna, cas
   this.clientDate      = new Date();  //klientsky datum nacteni stranky
   this.serverDate      = null;  //serverovy datum nacteni stranky


   this.start = function()    // spusteni casovace
   {
      this.started = true;
      if (document.uniqueID) // msie crazy timer
      {
         var t = this;
         this.timer = window.setInterval(function(){t.runSessionCountDown();}, this.interval, this);
      }
      else
      {
         this.timer = window.setInterval(function(self) {self.runSessionCountDown.call(self);} ,this.interval,this);
      }
   };

   this.xhr_session = function () // prodlouzeni session volani
   {
      dt = new Date();
      this.t1 = Math.round(dt.getTime() / 1000); // klientsky cas (timestamp)

      myConn = new XHConn();
      myConn.connect(dl_root+"/lib_class/sess_ext.php", "POST", "id="+dl_id, this.fnSessExtend, this);
   };


   this.fnSessExtend = function(data) // prodlouzeni session hotovo
   {
      var resp;

      try
      {
         resp = data.responseXML.getElementsByTagName("session")[0];
         if (resp.getAttribute('extended') === "true")
         {
            this.xhr_inProgress = false;
            t1 = this.t1;
            resp = data.responseXML.getElementsByTagName("session")[0];

            dt = new Date();
            t2 = parseInt(resp.getAttribute('time')); // serverovy cas (timestamp)
            s  = parseInt(resp.getAttribute('expire')); // platnost sessiony (sek)
            z  = parseInt(resp.getAttribute('maxextend')); // celkova zivotnost prihlaseni
            t3 = Math.round(dt.getTime() / 1000); // klientsky cas (timestamp)

            // floor(T2-((T1+T3)/2))
            d = Math.floor(t2 - ((t1+t3)/2) );
            // S-(T4+D-T2)   kde T4 = T3
            sek = s-(t3+d-t2);

            this.refreshCD = (dt.getTime()/1000)+sek;
            this.sessionLifetime = sek;
            this.sessionCD = (dt.getTime()/1000)+z-(t3+d-t2);

            if (!this.started)
            {
               this.start();
            }
         }
         else // neprodluzovat session
         {
            window.clearTimeout(this.timer);

            var buf = new Array();
            for (i in this)
            {
               if (typeof this[i] != "function")
                  buf.push(i + " = " + this[i]);
            }
            alert(dl_lang["stev.js_session_timeout"]+"."); // tecka na rozliseni dialogu, nelze prodlouzit session, mozna asi uz skoncila
         }
      }
      catch (e) // chyba vystupu, mozna uzivatel klikl na libovolny odkaz drive nez se stihl nacist. Budeme delat ze se nic nedeje.
      {
         // window.clearTimeout(this.timer);
         // alert("Prodloužení platnosti přihlášení se nezdařilo. Neuložené změny mohou být ztraceny.");
      }
   };

   this.runSessionCountDown = function()
   {
      curr_dt = new Date();
      if (this.allowExtend == true)
      {
            logof_dt = new Date(this.sessionCD*1000);
      }else{
            logof_dt = new Date(this.clientDate.getTime()+this.sessionCD*1000-this.serverDate.getTime());
      }
      zbyva = Math.round((logof_dt - curr_dt)/1000);


      if (this.allowExtend == true) // je nastaven cfg stev_ajax_refresh
      {
         refresh_dt = new Date(this.refreshCD*1000);
         refresh_sec = Math.round((refresh_dt - curr_dt)/1000);

         if (zbyva <= this.sessionLifetime) // posledni obnoveni, dale uz neprovadet aby nam to vyslo presne
         {
            this.allowExtend = false;
            this.xhr_session();
         }
         else if (refresh_sec <= this.sessionPojistka) // zacneme o par sek. pred vyprsenim
         {
            if (this.xhr_inProgress != true)
            {
               this.xhr_inProgress = true;
               this.xhr_session();
            }
         }
      }

      if ((zbyva == this.notifyLimit) && (this.notifyLimit>0)) // zbyva X sek do odhlaseni a je nastaven cfg session_notify_expired
      {
         tm = numfix(logof_dt.getHours(), 2) + ":" + numfix(logof_dt.getMinutes(), 2) + ":" + numfix(logof_dt.getSeconds(), 2);
         var str_session_expired = "Za "+this.notifyLimit+"s budete odhlášeni. Pokud chcete bez odhlášení pokračovat v práci, klikněte na libovolný odkaz. (Ohlášeno v "+tm+").";
         alert(str_session_expired);
      }

      if (zbyva < 0) // session vyprsela
      {
         window.clearTimeout(this.timer);
         var str_session_expired = dl_lang["stev.js_session_timeout"];
         window.status = str_session_expired;
         getE("session").innerHTML = "--:--";
         getE("session").title = str_session_expired;

         if (this.notifyLimit>0) // je nastaven cfg session.notify_expired
         {
            alert(str_session_expired);
         }
      }
      else // odpocitavame
      {
         var m   = Math.floor(zbyva/60);
         var s   = Math.floor((zbyva % 60) % 60);
         var cas = "";

         if (m<10)
         {
            cas = cas+"0";
         }
         cas = cas+m+":";
         if (s<10)
         {
            cas = cas+"0";
         }

         cas = cas+s;
         getE("session").innerHTML = cas;
      }
   };
};

/*
 * @param sek        integer     platnost session
 * @param logonsek   integer     cas naxteni stranky
 * @param varovat    integer     varovat pred vyprsenim v sec
 * @param ajax_limit integer     jak dlouho obnovovat session
 */
function showSession(sek, logonsek, varovat, ajax_limit)
{

   sis_timer = new class_session();
   sis_timer.notifyLimit = varovat;
   sis_timer.serverDate = new Date(logonsek*1000);
   sis_timer.sessionCD = sek+logonsek;
   if (!ajax_limit)
   {
      sis_timer.refreshCD = false;
      sis_timer.start();
   }
   else // ajaxove obnovovani sessiony
   {
      sis_timer.allowExtend = true;
      sis_timer.xhr_session();
   }
}

/**
 * Invertuje checkboxy ve formuláři.
 * @param _frm Id prvku formuláře, může být prázdné v případě použití classname
 * @param _stav Stav, který se nastaví. 0=Off,1=On,ostatní=přepnout
 * @param classname CSS třída prvků, na které to platí. Pokud je _frm prázdné, pak všechny elementy s touto třídou na stránce
 */
function invert_form(_frm, _stav, classname)
{
   // skladacka selectoru checkboxu
   // napr. param.  _frm      = 'matrika_form'
   //               classname = 'class10296 shift-checkbox'
   //   = selector  #matrika_form input[type=checkbox].class10296.shift-checkbox
   qs = (_frm?'#'+_frm+' ':'')+'input[type=checkbox]'+(classname?'.'+classname.replace(" ", "."):'');

   document.querySelectorAll(qs).forEach(cbx =>
   {
       if (_stav == 1)
       {
           dl_set_checked(cbx,true);
       }
       else if (_stav == 0)
       {
           dl_set_checked(cbx,false);
       }
       else
       {
           dl_invert_checked(cbx);
       }
   });

   return false;
}

function dopln_datum(did)
{
   var t = getE(did).value;

   t=t.replaceAll(/ /g,"");
   getE(did).value=t;
   var den,dden,mesic,mmesic,rok,p;

   p = t.indexOf(".");
   if (p == -1) return;

   dden  = t.substring(0,p);
   den   = parseInt(dden);
   mesic = t.substring(p+1,t.length);

   p = mesic.indexOf(".");

   if (p == -1) return;

   rok   = mesic.substring(p+1,mesic.length);
   mmesic= mesic.substring(0,p);
   mesic = parseInt(mmesic);

   if (isNaN(den) == true || isNaN(mesic) == true || den != dden || mesic != mmesic) return;

   if (den < 1 || den > 31 || mesic < 1 || mesic > 12) return;

   if (rok.length == 0)
   {
         var dt = new Date();
         var rok=dt.getFullYear();
         getE(did).value = getE(did).value + rok;
   }
}

function dl_select_dual(__obj, __checked, __sel_array)
{
   var obj_select = getE(__obj);

   if (!obj_select || obj_select.type !== "select-one") return;

   dl_select_create(__obj,__checked==true?0:1);
}




function dl_select_create(__obj,__index)
{
      var obj_select = getE(__obj);
      var obj_data;
      if(typeof __index == "undefined")
      {
            __index = "";
      }
      else
      {
            __index = "["+__index+"]";
      }
      eval("obj_data = "+__obj+"_obj"+__index+";");
      obj_select.options.length = 0;
      var i=0;
      var format1 = "%nazev% - %kod%";
      if(typeof obj_data.format1 !== 'undefined')
      {
               format1 = obj_data.format1;
      }
      var format2 = "%kod% - %nazev%";
      if(typeof obj_data.format2 !== 'undefined')
      {
               format2 = obj_data.format2;
      }

      if(obj_data.empty_option)
      {
            obj_select.options[0] = new Option('---', '');
      }
      for(var first=true;;first=false)
      {
            for(var k=0;k<obj_data.data.length;k++)
            {
                 var key = obj_data.data[k].key;
                  var val = obj_data.data[k].value;
                  if(obj_data.first[key] == first)
                  {
                     var t = "";
                     if(obj_data.ciselnik)
                     {
                           if (obj_data.mode != 'kod')
                           {
                                 t = format1.replace(/%kod%/g,key).replace(/%nazev%/g,val);
                           }
                           else
                           {
                                 t = format2.replace(/%kod%/g,key).replace(/%nazev%/g,val);
                           }
                     }
                     else
                     {
                           t = val;
                     }
                     if(typeof obj_data.bez_ciselniku[key] !== "undefined")
                     {
                           if(obj_data.bez_ciselniku[key])
                           {
                                 t = val;
                           }
                     }
                     obj_select.options[obj_select.length] = new Option(t, key);
                     if(typeof obj_data.optstyle[key] !== "undefined")
                     {
                           obj_select.options[obj_select.length-1].className = obj_data.optstyle[key];
                     }
                  }
            }
            if(!first)
            {
                  break;
            }
      }
   dl_refresh_select("#"+__obj);
}

function dl_multiselect_povinn(select_id, obj_data)
{
      var obj_select = document.getElementById(select_id);
      if (!obj_select || !obj_select.multiple) return;

      // obecna pomocna promenna
      var i;
      // zapamatovani si polozek ktere byly oznaceny
      var obj_selected = Array();
      var obj_select_length = obj_select.length;
      for (i = 0; i < obj_select_length; i++ )
      {
           if(obj_select.options[i].selected)
           {
               obj_selected[obj_select.options[i].value] = true;
           }
      }

      var items;
      var tmpArray;
      obj_select.options.length = 0;

      var order_numeric = false;
      if(typeof obj_data.order_numeric !== 'undefined')
      {
            order_numeric = obj_data.order_numeric;
      }

      if (obj_data.mode != 'kod')
      {
         // seradit dle textu
         // nahrazení textu TEXT - KOD
         for (key in obj_data.data)
         {
            obj_select.options[obj_select.length] = new Option(obj_data.data[key] + ' - ' + key, key);
         }
         // trideni
         items = obj_select.options.length;
         tmpArray = new Array(items);
         for (i=0; i < items; i++ )
         {
            tmpArray[i] = new Option(obj_select.options[i].text,obj_select.options[i].value);
         }
         if(order_numeric)
         {
            tmpArray.sort();
         }
         else
         {
            tmpArray.sort(dl_select_povinn_sort);
         }
         for (i = 0; i < items; i++ )
         {
            obj_select.options[i] = new Option(tmpArray[i].text,tmpArray[i].value);
         }
         obj_data.mode = 'kod';
      }
      else
      {
         // seradit dle kodu
         // nahrazení textu KOD - TEXT
         for (key in obj_data.data)
         {
             obj_select.options[obj_select.length] = new Option(key + ' - ' + obj_data.data[key], key);
         }
         // trideni
         items = obj_select.options.length;
         tmpArray = new Array(items);
         for (i=0; i < items; i++ )
         {
            tmpArray[i] = new Option(obj_select.options[i].text,obj_select.options[i].value);
         }
         tmpArray.sort(dl_select_kod_sort);
         for (i = 0; i < items; i++ )
         {
            obj_select.options[i] = new Option(tmpArray[i].text,tmpArray[i].value);
         }
         obj_data.mode = 'text';
      }
      // znovu vybrani polozek ktere byly oznaceny
      for (i = 0; i < obj_select_length; i++ )
      {
           if(typeof obj_selected[obj_select.options[i].value] !== "undefined")
           {
               obj_select.options[i].selected = "selected";
           }
      }
      dl_refresh_select("#"+select_id);
}

function dl_select_povinn(select_id, obj_data)
{
      dl_select_order(select_id,obj_data);
}


//TODO: sjednotit s dl_select_create, aby fungovalo i na dual apod.
function dl_select_order(select_id, obj_data)
{
      var obj_select = document.getElementById(select_id);
      if (!obj_select || (obj_select.type !== 'select-multiple' && obj_select.type !== "select-one")) return;

      var obj_select_mode = document.getElementById(select_id+"_mode");

      // nacteni oznacenych veci
      var obj_selected;
      var obj_selected_length;
      if(obj_select.type !== "select-one")
      {
         obj_selected = new Array();
         obj_selected_length = obj_select.length;
         for (i = 0; i < obj_selected_length; i++ )
         {
              if(obj_select.options[i].selected)
              {
                  obj_selected[obj_select.options[i].value] = true;
              }
         }
      }
      else
      {
          if (obj_select.selectedIndex == -1)
          {
               obj_selected = "";
          }
          else
          {
              obj_selected = obj_select.options[obj_select.selectedIndex].value;

          }
      }

      //vyprazdneni
      $(obj_select).empty();
      var format1 = "%nazev% - %kod%";
      if(typeof obj_data.format1 !== 'undefined')
      {
               format1 = obj_data.format1;
      }
      var format2 = "%kod% - %nazev%";
      if(typeof obj_data.format2 !== 'undefined')
      {
               format2 = obj_data.format2;
      }

      var order_numeric = false;
      if(typeof obj_data.order_numeric !== 'undefined')
      {
            order_numeric = obj_data.order_numeric;
      }


      var format = format1;

      if (obj_data.mode === "kod")
      {
            obj_data.mode = 'text';

            //popisky přepínací ikonky
            var sw = getE(select_id+"_switch");
            if(sw)
            {
                  sw.title = dl_lang["stev.order_kod_nazev"];
                  sw.children[0].title = dl_lang["stev.order_kod_nazev"];
                  sw.children[0].alt = dl_lang["stev.order_kod_nazev"];
            }
      }
      else
      {
            obj_data.mode = 'kod';

            var sw = getE(select_id+"_switch");
            if(sw)
            {
                  sw.title = dl_lang["stev.order_nazev_kod"];
                  sw.children[0].title = dl_lang["stev.order_nazev_kod"];
                  sw.children[0].alt = dl_lang["stev.order_nazev_kod"];
            }
            format = format2;
      }

      var data = obj_data.data;

      data.sort(function(a,b){

         //nejdřív porovnám first
         if((typeof obj_data.first !== 'undefined')&&(typeof obj_data.first[a.key] !== 'undefined')&&(typeof obj_data.first[b.key] !== 'undefined'))
         {
               var fa = obj_data.first[a.key]?1:-1;
               var fb = obj_data.first[b.key]?1:-1;
               var f = fb-fa;
               if(f!==0)
               {
                     return f;
               }
         }

         //pak porovnám grupy
         if(typeof obj_data.group !== 'undefined')
         {
               if((typeof obj_data.group[a.key] !== 'undefined')&&(typeof obj_data.group[b.key] !== 'undefined'))
               {
                     var cg = dl_sort_string(obj_data.group[a.key],obj_data.group[b.key]);
                     if(cg!==0)
                     {
                           return cg;
                     }
               }
         }
         if (obj_data.mode === "kod")
         {
            //podle kodu
            return order_numeric?a.key-b.key:dl_sort_string(a.key,b.key);
         }
         else
         {
            //podle nazvu
            return dl_sort_string(a.value,b.value);
         }
      });



      var p = 0;

      if(obj_select.type === "select-one" && obj_data.empty_option)
      {
            $(obj_select).append(new Option('---', ''));
      }

      var opts = [];
      var grp = "-";
      var grpkey = null;
      var p = 0;

      for (var i=0; i < data.length; i++)
      {
         //tolik ochcavek je tam kvůli skupinám
         var ngrp = "";
         if(typeof obj_data.group[data[i].key] !== 'undefined')
         {
               ngrp = obj_data.group[data[i].key];
         }
         var ngrpkey = null;
         if(typeof obj_data.group_key[data[i].key] !== 'undefined')
         {
               ngrpkey = obj_data.group_key[data[i].key];
         }

         //bacha tahle cast je jeste dole
         if(grp!==ngrp && grp!=='-')
         {
               if(grp === "")
               {
                     $(obj_select).append(opts);
               }
               else
               {
                     if(grpkey!==null && obj_data.group_select)
                     {
                           var opt = new Option(grp,grpkey);
                           $(obj_select).append($(opt).css({'font-weight':'bold','font-style': 'italic'}));
                           for(var p=0;p<opts.length;p++)
                           {
                                 $(opts[p]).html('&nbsp;&nbsp;&nbsp;'+opts[p].label);
                           }
                           $(obj_select).append(opts);
                     }
                     else
                     {
                           $(obj_select).append($('<optgroup/>').attr("label",grp).append(opts));
                     }
               }
               opts = [];
         }
         grp = ngrp;
         grpkey = ngrpkey;



         var popis = format.replace(/%kod%/g,data[i].key.replace('%23','#')).replace(/%nazev%/g,data[i].value);
         if(obj_data.bez_ciselniku[data[i].key])
         {
               popis = data[i].value;
         }
         var opt = new Option(popis,data[i].key);
         if(typeof obj_data.optstyle[data[i].key] !== 'undefined')
         {
               opt.className = obj_data.optstyle[data[i].key];
         }

         opts.push(opt);
      }

      if(grp === "")
      {
            $(obj_select).append(opts);
      }
      else
      {
            //bacha, tahle cast je jeste nahore
            if(grpkey!==null && obj_data.group_select)
            {
                  var opt = new Option(grp,grpkey);
                  $(obj_select).append($(opt).css({'font-weight':'bold','font-style': 'italic'}));
                  for(var p=0;p<opts.length;p++)
                  {
                        $(opts[p]).html('&nbsp;&nbsp;&nbsp;'+opts[p].label);
                  }
                  $(obj_select).append(opts);
            }
            else
            {
                  $(obj_select).append($('<optgroup/>').attr("label",grp).append(opts));
            }
      }

      // znovu oznaceni oznacenych prvku
      if(obj_select.type !== "select-one")
      {
            // znovu vybrani polozek ktere byly oznaceny
            for (i = 0; i < obj_selected_length; i++ )
            {
                try
                {
                    if(typeof(obj_selected[obj_select.options[i].value]) !== 'undefined')
                    {
                        obj_select.options[i].selected = "selected";
                    }
                }
                catch (e) {} // prvek neexistuje, nebudeme ho oznacovat

            }
      }
      else
      {
            obj_select.value = obj_selected;
      }
      if(typeof obj_select_mode !== 'undefined' && obj_select_mode != null)
      {
            obj_select_mode.value = obj_data.mode;
      }
      dl_refresh_select("#"+select_id);
}


function dl_select_povinn_sort(a,b)
{
   return dl_sort_string(a.text,b.text);
}

/**
 * pomocna tridici funkce - řadí řetězce podle zvyklostí locale bez ohledu na velikosti písmen
 */
function dl_sort_string(a,b)
{
    if("Miloš je prezident".localeCompare)
    {
        var tmp_a = a.toLowerCase();
        var tmp_b = b.toLowerCase();
        return tmp_a.localeCompare(tmp_b);
    }
    else
    {
        return a != b ? a < b ? -1 : 1 : 0;
    }
}

/**
 * Seřadí položky. Čísla první (numericky), pak řetězce.
 * @param a
 * @param b
 * @returns int -1/1/0
 */
function dl_sort_numbers_strings(a,b)
{
    a = (parseInt(a)==a)?parseInt(a):a;
    b = (parseInt(b)==b)?parseInt(b):b;

    if (typeof a == "string" && typeof b == "number") // string za number
    {
        return 1;
    }
    else if (typeof a == "number" && typeof b == "string") // number před string
    {
        return -1;
    }
    else if(!Number.isInteger(a) && !Number.isInteger(b) && "Miloš je prezident".localeCompare) // porovnání 2 textů diakritikou
    {
        var tmp_a = a.toLowerCase();
        var tmp_b = b.toLowerCase();
        return tmp_a.localeCompare(tmp_b);
    }
    else // porovnání dvou čísel a také nouzový režim
    {
        return a != b ? a < b ? -1 : 1 : 0;
    }
}
function dl_select_kod_sort(a,b)
{
   return a.value != b.value ? a.value < b.value ? -1 : 1 : 0;
}

function dl_showhide(obj, obj_data)
{
      if (!obj || !(obj_data instanceof Array)) return;

      for (i in obj_data)
      {
            ShowHide(obj_data[i], 0);
      }

      if (obj.value in obj_data)
      {
            ShowHide(obj_data[obj.value], 1);
      }
}


/* :::::::::::::::: HINT ::::::::::::::::::: */

var tt_db = (document.compatMode && document.compatMode != "BackCompat")? document.documentElement : document.body? document.body : null,
tt_n = navigator.userAgent.toLowerCase(),
tt_nv = navigator.appVersion;
var tt_op = !!(window.opera && document.getElementById),
tt_op6 = tt_op && !document.defaultView,
tt_op7 = tt_op && !tt_op6,
tt_ie = tt_n.indexOf("msie") != -1 && document.all && tt_db && !tt_op,
tt_ie6 = tt_ie && parseFloat(tt_nv.substring(tt_nv.indexOf("MSIE")+5)) >= 5.5;
tt_n4 = (document.layers && typeof document.classes != tt_u),
tt_n6 = (!tt_op && document.defaultView && typeof document.defaultView.getComputedStyle != tt_u),
tt_w3c = !tt_ie && !tt_n6 && !tt_op && document.getElementById;
var tt_u = "undefined";

function tt_Int(t_x)
{
	var t_y;
	return isNaN(t_y = parseInt(t_x))? 0 : t_y;
}

function getDivW(id)
{
   return tt_Int( tt_n4 ? getE(id).clip.width : (getE(id).style.pixelWidth || getE(id).offsetWidth) );
}
function getDivH(id)
{
   return tt_Int( tt_n4 ? getE(id).clip.height : (getE(id).style.pixelHeight || getE(id).offsetHeight) );
}

var timerId = null;
var t_id;
var t_mod;
var ex = 0;
var ey = 0;

function ShowHint(id,mod,tout,text)
{
   HideHint(id);
   t_id = id;

   if (text!=undefined && text!="")
   {
         mod = text;
   }
   else if (mod!=undefined && mod!="")
   {
         mod  = eval(mod);
   }

   if (mod!="")
   {
         t_mod = mod;

         if (tout == 0)
         {
               ShowHintTimeOut();
         }
         else
         {
               timerId = setTimeout("ShowHintTimeOut()", tout);
         }
   }
}

function ShowHintTimeOut()
{
   if (timerId!=null)
   {
         clearTimeout(timerId);
         timerId=null;
   }

   getE(t_id+"lbl").innerHTML = t_mod;
   ShowHide(t_id,1);

   SetHintPos();
}

function SetHintPos()
{
   var divPos={"left":0, "top":0};

   if (getDivH(t_id)>winH())
   {
         divPos.top = window.scrollY + ((winH()-getDivH(t_id))/2) - 15;
         if (divPos.top < 0) //aby to nebylo useknuté nahoře
         {
             divPos.top = 0;
         }
   }
   else if ((ey+getDivH(t_id)+20)>winH())
   {
         if ((getDivH(t_id)+10) > ey)
         {
               divPos.top = window.scrollY + ((winH() - getDivH(t_id))/2) - 15;
         }
         else
         {
               divPos.top = window.scrollY + ey - getDivH(t_id) - 20;
         }
   }
   else
   {
         divPos.top = window.scrollY + ey + 4;
   }

   if (getDivW(t_id)>winW())
   {
         divPos.left = window.scrollX+((winW()-getDivW(t_id))/2)-15;
   }
   else if ((ex+getDivW(t_id)+20)>winW())
   {
         if ((getDivW(t_id)+10)>ex)
         {
               divPos.left = window.scrollX+((winW()-getDivW(t_id))/2)-15;
         }
         else
         {
               divPos.left = window.scrollX+ex-getDivW(t_id)-20;
         }
   }
   else
   {
         divPos.left = window.scrollX+ex+4;
   }
   getE(t_id).style.left = divPos.left + "px";
   getE(t_id).style.top  = divPos.top  + "px";
}

function HideHint(id)
{
   if (timerId != null)
   {
         clearTimeout(timerId);
         timerId=null;
   }

   ShowHide(id,0);
}

function setxy(e)
{
   ex = document.all?window.event.clientX:e.clientX;
   ey = document.all?window.event.clientY:e.clientY;
}

document.onmousemove=setxy;

function winH()
{
   if (window.innerHeight)
   {
         return window.innerHeight;
   }
   else if (document.documentElement && document.documentElement.clientHeight)
   {
         return document.documentElement.clientHeight;
   }
   else if (document.body && document.body.clientHeight)
   {
         return document.body.clientHeight;
   }
   else
   {
         return null;
   }
}

function winW()
{
   if (window.innerWidth)
   {
         return window.innerWidth;
   }
   else if (document.documentElement && document.documentElement.clientWidth)
   {
         return document.documentElement.clientWidth;
   }
   else if (document.body && document.body.clientWidth)
   {
         return document.body.clientWidth;
   }
   else
   {
         return null;
   }
}

function js_confirm(text,url)
{
   if (confirm(text))
   {
         location.href = url;
   }
   else
   {
         return false;
   }
}

function dl_textarea_check_limit(e, vynutit_chybu){
   return dl_textarea_check_limit_ex(e,$(e).find("textarea").val(),vynutit_chybu);
}

function dl_textarea_check_limit_ex(e, content, vynutit_chybu){
   var $e = $(e);
   var min_len = $e.is("[data-param_min_length]") ? $(e).attr("data-param_min_length") : false;
   var max_len = $e.is("[data-param_max_length]") ? $(e).attr("data-param_max_length") : false;

   if(min_len == false && max_len == false)
   {
      return;
   }
   $txt = $e.find("textarea");
   var obj_ref_id = $txt.attr("id");
   $zadano = $("#textarea_limit_"+obj_ref_id+"_zadano");
   $zbyva = $("#textarea_limit_"+obj_ref_id+"_zbyva");
   $txt_zbyva = $("#textarea_limit_"+obj_ref_id+"_txt_zbyva");
   $do = $("#textarea_limit_"+obj_ref_id+"_do");
   var txt_length = content.replace(/\r/g,'').replace(/\n/g,'nl').length;

   $zadano.html(txt_length);
   if (min_len !== false && txt_length < min_len)
   {
      $txt.attr("class","inp3");
      $zadano.get(0).parentNode.parentNode.className = 'error';
      $txt_zbyva.html(dl_lang["stev.zbyva"]);
      $zbyva.html(min_len-txt_length);
      $do.html(dl_lang["stev.dominima"]);
   }
   else if (max_len !== false && txt_length > max_len)
   {
      $txt.attr("class","inp3");
      $zadano.get(0).parentNode.parentNode.className = 'error';
      $txt_zbyva.html(dl_lang["stev.prebyva"]);
      $zbyva.html((max_len-txt_length)*(-1));
      $do.html("");
   }
   else
   {
         if ((typeof vynutit_chybu == "undefined") || !vynutit_chybu)
         {
               $txt.attr("class","inp2");
         }
         $zadano.get(0).parentNode.parentNode.className = null;
         if(max_len > 0)
         {
               $txt_zbyva.html(dl_lang["stev.zbyva"]);
               $zbyva.html(max_len - txt_length);
               $do.html(dl_lang["stev.domaxima"]);
         }
         else
         {
               $txt_zbyva.html("");
               $zbyva.html("");
               $do.html("");
         }
   }
}

$(document).ready(function(){
   $(".form_textarea.param_pocitadlo").each(function(i,e){
      var $txt = $(e).find("textarea");
      var vynutit_chybu = $txt.hasClass("inp3");
      dl_textarea_check_limit(e,vynutit_chybu);
      $txt.change(function(){
         dl_textarea_check_limit(e);
      }).keyup(function(){
         dl_textarea_check_limit(e);
      });
   });


   document.querySelectorAll('input[type="range"][data-star-rating]').forEach(function (element)
   {
       dl_star_rating(element);
   });


});

function in_array(value, arr)
{
   var i;

   if(value != null && arr != null && (arr instanceof Array))
   {
      for (i = 0; i < arr.length; i++)
      {
         if (arr[i] === value)
         {
            return true;
         }
      }
   }

   return false;
}

/**
 * Adds time to a date. Modelled after MySQL DATE_ADD function.
 * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
 * https://stackoverflow.com/a/1214753/18511
 *
 * @param date  Date to start with
 * @param interval  One of: year, quarter, month, week, day, hour, minute, second
 * @param units  Number of units of the given interval to add.
 */
function dateAdd(date, interval, units) {
    if(!(date instanceof Date))
        return undefined;
    var ret = new Date(date); //don't change original date
    var checkRollover = function() { if(ret.getDate() != date.getDate()) ret.setDate(0);};
    switch(String(interval).toLowerCase()) {
        case 'year'   :  ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
        case 'quarter':  ret.setMonth(ret.getMonth() + 3*units); checkRollover();  break;
        case 'month'  :  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
        case 'week'   :  ret.setDate(ret.getDate() + 7*units);  break;
        case 'day'    :  ret.setDate(ret.getDate() + units);  break;
        case 'hour'   :  ret.setTime(ret.getTime() + units*3600000);  break;
        case 'minute' :  ret.setTime(ret.getTime() + units*60000);  break;
        case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
        default       :  ret = undefined;  break;
    }
    return ret;
}

var registered_divs = new Array();

function addRegDiv(divid)
{
   registered_divs[registered_divs.length] = divid;
}

function removeRegDiv(divid)
{
   for(var i=0;i<registered_divs.length;i++)
   {
         if(registered_divs[i]==divid)
         {
               registered_divs.splice(i,1);
               i--;
         }
   }
}

function HideAllRegisteredDivs()
{
   for(i=0; i<registered_divs.length; i++)
   {
      ShowHide(registered_divs[i], 0);
   }
}

function isChildOfRegDiv(child)
{
   var retval = false;

   if(typeof(ContainerObject) == "string")
   {
      child = document.getElementById(child);
   }

   if(child != null)
   {
      //alert(registered_divs.length);
      for(i=0; i<registered_divs.length; i++)
      {
         if(isChildOf(child, registered_divs[i]))
         {
            retval = true;
            break;
         }
      }
   }

   return retval;
}


function isChildOf(ChildObject, ContainerObject)
{
   var retval = false;
   var curobj;

   if(typeof(ContainerObject) == "string")
   {
      ContainerObject = document.getElementById(ContainerObject);
   }

   if(typeof(ChildObject) == "string")
   {
      ChildObject = document.getElementById(ChildObject);
   }

   if(ChildObject != null && ContainerObject != null)
   {
      curobj = ChildObject.parentNode;

      while(curobj != null)
      {
         if(curobj == document.body)
         {
            break;
         }

         if(curobj.id == ContainerObject.id)
         {
            retval = true;
            break;
         }
         curobj = curobj.parentNode;
      }
   }

   return retval;
}


function getEventSourceElement(event)
{
   if(Boolean(event.srcElement))
   {
      return event.srcElement;
   }
   else
   {
      return event.target;
   }
}

function multiple_select_title(select_id)
{
   var dta="";

   if (el = select_id.options)
   {
   for (i=0;i<el.length;i++)
   {
      if (el[i].selected == true)
      {
         dta += el[i].innerHTML+"<br>";
      }
   }
   }

   var hint = document.getElementById(select_id.id+"_hint");

   if (dta!="")
   {
      hint.style.visibility = "visible";
      hint.customdata = '<b>'+dl_lang['stev.js_selected_multiple']+'</b><br>'+dta;
   }
   else
   {
      hint.style.visibility = "hidden";
      hint.customdata = '';
   }
}

/** XHConn - Simple XMLHTTP Interface - bfults@gmail.com - 2005-04-08        **
 ** Code licensed under Creative Commons Attribution-ShareAlike License      **
 ** http://creativecommons.org/licenses/by-sa/2.0/                           **/
function XHConn()
{
  var xmlhttp, bComplete = false;
  try {xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");}
  catch (e) {try {xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");}
  catch (e) {try {xmlhttp = new XMLHttpRequest();}
  catch (e) {xmlhttp = false;}}}
  if (!xmlhttp) return null;
  this.connect = function(sURL, sMethod, sVars, fnDone, vThis)
  {
    if (!xmlhttp) return false;
    bComplete = false;
    sMethod = sMethod.toUpperCase();

    try {
      if (sMethod == "GET")
      {
        xmlhttp.open(sMethod, sURL+"?"+sVars, true);
        sVars = "";
      }
      else
      {
        xmlhttp.open(sMethod, sURL, true);
        xmlhttp.setRequestHeader("Method", "POST "+sURL+" HTTP/1.1");
        xmlhttp.setRequestHeader("Content-Type",
          "application/x-www-form-urlencoded");
      }
      xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && !bComplete)
        {
          bComplete = true;
          if (vThis)
          {
            fnDone.call(vThis, xmlhttp);
          }
          else
          {
            fnDone(xmlhttp);
          }
        }};
      xmlhttp.send(sVars);
    }
    catch(z) {return false;}
    return true;
  };
  return this;
}

function xhr_tooltip(obj, url, param, evt, autohint)
{
   this.obj = obj;
   this.url = url;
   this.xhr = false;
   this.req_data = (param)?param:"";
   this.evt = (!evt)?"click":evt;
   this.timer = null;
   this.timeout = 500;
   this.obj_hint = (!autohint)?getE("hint"):false;
   this.obj_hint_auto = (autohint);

   this.install = function(hint)
   {
      var t = this;

      t.create_hint();
      t.obj.title = t.obj.alt = '';

      if (!XmlHttpRequest)
      {
            return false;
      }

      if (this.evt == "click")
      {

            dl_addEventListener('click',this.obj,function()
            {
               t.start_xhr.call(t);
            });
      }
      else
      {
            this.obj.onmouseover = function()
            {
               t.timer = window.setTimeout(function()
               {
                     t.start_xhr.call(t);
               }, t.timeout, t);


            }

            this.obj.onmouseout = function()
            {
                  t.showhide_hint();
                  window.clearTimeout(t.timer);
            }
      }
   }

   this.create_hint = function()
   {
      var t = this;

      if (this.obj_hint_auto)
      {
            this.obj_hint = document.createElement('div');
            this.obj_hint.style.position = "absolute";
            this.obj_hint.style.backgroundColor = "#FEF7C1";
            //vlastnost bottom se nastavuje až při vlastním zobrazení

            if (this.obj.parentNode.nodeName.toLowerCase() == 'span')
            {
                  this.obj_hint.style.zindex = "1";
                  this.obj_hint.style.display = "none";
                  this.obj_hint.style.left = "0";
                  this.obj.parentNode.style.position = "relative";
            }

            obj_hintlbl = document.createElement('div');
            this.obj_hint.appendChild(obj_hintlbl);
            this.obj.parentNode.appendChild(this.obj_hint);
      }
      else
      {
            this.obj_hint.style.width = null;
      }
       dl_addEventListener('click',this.obj_hint,function(e)
            {
               //pokud aktualne zobrazeny obsah hintu obsahuje prvek s tridou "hint_close",
               //zavri jen pri kliknuti na nej (jinak zachovej puvodni chovani - zavreni kdekoliv v hintu).
               //Rozhoduje se dle sdileneho obsahu #hint, protoze na nej vesi handler vsechny instance xhr_tooltip na strance.
               if ($(t.obj_hint).find('.hint_close').length && !$(e.target).closest('.hint_close').length)
               {
                  return;
               }
               t.showhide_hint();
            });
   }

   this.showhide_hint = function(show)
   {
      if (this.obj_hint_auto)
      {
         if (show)
         {
               this.obj_hint.style.bottom = (parseInt(this.obj.offsetHeight)+2)+"px"; //IE poskytuje offsetHeight až po načtení celé stránky, proto nejde zjišťovat hned v create_hint
               this.obj_hint.style.display = 'block';
         }
         else
         {
               this.obj_hint.style.display = 'none';
         }
      }
      else
      {if (show)
               ShowHint(this.obj_hint.id, false,0, '<div style="text-align:center;"><img src="../img/ajax-loader_big.gif" /></div>Načítám... / Loading ...');
            else
               HideHint(this.obj_hint.id);
      }
   }

   this.start_xhr = function()
   {
      this.obj_hint
      this.showhide_hint(true);
      var t = this;

      var bComplete = false;
      this.xhr = XmlHttpRequest;
      this.xhr.open("POST", this.url, true);

      this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      //Content-length a Connection jsou "forbidden header names" - prohlizec je nastavi sam a jejich rucni nastaveni jen hlasi warning do konzole
      this.xhr.onreadystatechange = function()
      {
            if (t.xhr.readyState == 4 && !bComplete)
            {
                  bComplete = true;
                  t.load_done();
            }
      };
      this.xhr.send(this.req_data);
   }

   this.load_done = function()
   {
      if (this.obj_hint_auto)
      {
         el = this.obj_hint;
      }
      else
      {
         el = getE(this.obj_hint.id+"lbl");
         t_id = this.obj_hint.id;
      }

      el.innerHTML = this.xhr.responseText;

      if (!this.obj_hint_auto)
      {
         SetHintPos();
      }
   }

   this.install();
}

/**
 **   focusObjIf_maxLength(source, target)
 **
 **   source potrebuje nastavenou maxLength
 **   kdyz je text v source dlouhy jak maxlength, skoc na target
 **/
function focusObjIf_maxLength(source, target)
{
      if (source.value.length==source.maxLength)
      {
            getE(target).focus();
      }
}

function Popup(source)
{
   this.source = null;
   this.divs = {"main": null, "bg": null};
   this.hasCloseButton = true;
   this.backgroundClose = false;
   this.content = null;
   this.closeButtonTitle = "Ok";
   this.closeAction = null;

   this.open = function (par)
   {
      var t;
      if (!this.content)
      {
            this.content = this.source.cloneNode(true);
            this.content.style.display = "block";
            if (this.source.parentNode) // jde o prvek umisteny v dokumentu = ne dynamicky vytvoreny
            {
                this.source.parentNode.removeChild(this.source);
            }
      }

      this.button = document.createElement("input");
      this.button.setAttribute("type", "button");
      this.button.setAttribute("value", this.closeButtonTitle);
      this.button.setAttribute("autofocus", "autofocus");
      this.button.className = "but2";

      centerdiv = document.createElement("div");
      if (this.hasCloseButton)
      {
            centerdiv.className = "popup_bottom";
            centerdiv.appendChild(this.button);
      }

      obj_in = document.createElement("div");
      obj_in.className = "popup_in";

      obj_in.appendChild(this.content);
      obj_in.appendChild(centerdiv);

      this.divs.main = document.createElement("div");
      this.divs.main.appendChild(obj_in);
      this.divs.main.className = "popup";
      if (this.width)
      {
         this.divs.main.style.width      = this.width+"px";
         this.divs.main.style.marginLeft = "-"+(this.width/2)+"px";
      }

      this.divs.bg = document.createElement("div");
      this.divs.bg.className = "popup_bg";
      document.body.appendChild(this.divs.bg);

      document.body.appendChild(this.divs.main);



      t = this;
      if (this.backgroundClose)
      {
            dl_addEventListener('click',this.divs.bg,function()
            {
               t.remove.call(t);
            });

      }

      dl_addEventListener('click',this.button,function()
            {
               t.remove.call(t);
            });
   };

   this.setWidth = function(w)
   {
      this.width = w;
   }

   this.hideSource = function()
   {
      this.source.style.display = "none";
   }

   this.remove = function ()
   {
      document.body.removeChild(this.divs.main);
      document.body.removeChild(this.divs.bg);
      if ((typeof this.closeAction).toLowerCase() == "function")
      {
         this.closeAction();
      }
      return false;
   };

   if (source)
   {
         this.source = source;
         this.hideSource();
   }
}

/**
 * @param n    cislo
 * @param len  delka retezce, pripadne budou doplneny nuly pred retezec
 */
function numfix(n, len)
{
   n = n.toString();

   if (n.length < len)
   {
      for (var i = n.length; i < len ; i++)
      {
         n = "0"+n;
      }
      return n;
   }
   else
   {
      return n;
   }
}


/**
 * Přidá naslouchač událostí
 * @param string eventName Název události (bez předpony "on"), například "click","change"
 * @param object element Element, na který se má událost vázat (například vrácený funkcí getE)
 * @param function func Funkce, která zachytí událost
 */
function dl_addEventListener(eventName, element, func)
{
   $(element).on(eventName, func);
}
/**
 * Vyvolá událost na elementu
 * POUŽÍVAT MÍSTO element.onclick() apod.
 * @param string eventName Název události (bez předpony "on"), například "click","change"
 * @param object element Element, na který se má událost vázat (například vrácený funkcí getE)
 */
function dl_dispatchEvent(eventName,element)
{
   var event;

   if (document.createEvent)
   {
         event = document.createEvent("HTMLEvents");
         event.initEvent(eventName, true, true);
   }
   else
   {
         event = document.createEventObject();
         event.eventType = eventName;
   }

   event.eventName = eventName;

   if (document.createEvent)
   {
         element.dispatchEvent(event);
   }
   else
   {
         element.fireEvent("on" + event.eventType, event);
   }
}


// Return an array of the selected opion values
// select is an HTML select element
// @author http://stackoverflow.com/questions/5866169/getting-all-selected-values-of-a-multiple-select-box-when-clicking-on-a-button-u
function getSelectValues(select)
{
   var result = [];
   var options = select && select.options;
   var opt;

   for (var i=0, iLen=options.length; i<iLen; i++)
   {
      opt = options[i];

      if (opt.selected)
      {
         result.push(opt.value || opt.text);
      }
   }
   return result;
}

function dl_findYPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
    return 0;
}

function dl_scrollTo(elem,offset)
{
      offset = typeof offset !== 'undefined' ? offset : 0;
      var p=dl_findYPos(elem);
      p=offset*1+p*1;
      if(p<0)
      {
            p=0;
      }
      window.scroll(0,p);
}

function dl_disable(obj, islocked)
{
   if (islocked) obj.setAttribute("disabled", "disabled");
   else obj.removeAttribute("disabled");
   obj.disabled = islocked;
}

function dl_str_pad(input, len, pad_with, pad_side)
{
   pad_with = pad_with.toString();
   input = input.toString();

   if (!pad_with) pad_with = "*";
   if (!pad_side) pad_side = "R";
   if (input.length>=len) return input;
   while (input.length < len)
   {
      if (pad_side=="R")
      {
         input += pad_with.toString();
      }
      else
      {
         input = pad_with.toString() + input.toString();
      }
    }
   return input;
}

/**
 * Nahradí nebezpečné znaky (jako ?,=,#,&) pro encodování parametru v URL.
 * Používat místo encodeURIComponent, které nepodoruje win1250
 * @param String s Řetězec
 * @returns String
 */
function dl_encodeURIComponent(s)
{
   return s.replace(",","%2C").replace("/","%2F").replace("?","3F%").replace(":","3A%").replace("@","40%").replace("&","26%").replace("=","3D%").replace("+","2B%").replace("$","24%").replace("#","23%");
}




function dl_notify_check_cancel()
{
      if(dl_notify_timer!=null)
      {
            window.clearTimeout(dl_notify_timer);
            dl_notify_timer = null;
      }
}
function dl_notify_check_schedule()
{
       dl_notify_check_cancel();
       var interval = dl_notify_window_active?dl_notify_interval_aktivni:dl_notify_interval_neaktivni;
       if(interval > 0)
       {
            dl_notify_timer = window.setTimeout(dl_notify_check,(interval)*1000);
       }
}

function dl_notify_check()
{
   $.get(dl_root+'/stev/rest.php?id='+dl_id+'&tid='+dl_tid+'&do=notify_check&response_fmt=json', function(resp){
         if(resp['status']=='OK'){
               dl_notify_pocet = resp['data']['pocet_notify'];
               if(typeof resp['data']['pocet_mailu'] != 'undefined'){
                  var mailu_pocet = resp['data']['pocet_mailu'];
                  if(mailu_pocet > 0)
                  {
                     dl_notify_pocet++;
                  }
               }
               dl_notify_show();
         }
      }).always(function(){
         dl_notify_check_schedule();
      });
}

var dl_notify_list = [];

function dl_notify_list_generate()
{


   var s = 0;

   for(var i=1 /*schvalne od 1*/;i<dl_notify_list.length;i++)
   {
         dl_notify_list[i].nova_skupina = false;
         dl_notify_list[i-1].skupina = 0;
         if(dl_notify_list[i].text_multi == dl_notify_list[i-1].text_multi)
         {
               if(i<2 || (dl_notify_list[i-2].text_multi!=dl_notify_list[i].text_multi))
               {
                     dl_notify_list[i-1].nova_skupina = true;
                     s++;
                     //skupiny.push(dl_notify_list[i].text_multi);
                     //

               }
               dl_notify_list[i-1].skupina = s;
               dl_notify_list[i].skupina = s;
         }
   }


   for(var i=0;i<dl_notify_list.length;i++)
   {
         if(false)
         {
               if(dl_notify_list[i].nova_skupina)
               {
                     $('#stev_notify_bar ul').prepend('<li class="notify_item notify_group" id="stev_notify_group_'+dl_notify_list[i].skupina+'"><img src="'+dl_root+'/img/'+dl_notify_list[i].ikona+'" alt="ikonka" width="16" height="16" /><span class="text">'+dl_notify_list[i].text_multi+'</span><span class="datum"></span></a></li>');
                     $("#stev_notify_bar #stev_notify_group_"+dl_notify_list[i].skupina).append('<ul class="stev_notify_submenu"></ul>')
               }
               var target_menu;
               if(dl_notify_list[i].skupina > 0)  //TODO:grupení
               {
                     target_menu = "#stev_notify_bar #stev_notify_group_"+dl_notify_list[i].skupina+" ul.stev_notify_submenu";
               }
               else
               {
                     target_menu = "#stev_notify_bar ul";
               }
         }
         else
         {
            target_menu = "#stev_notify_bar ul";
         }
         var link = dl_notify_list[i].link;
         if(link == "" || link === null)
         {
               link = null;
         }else{
            link = link.replace('<sis_url>',dl_root).replace('{{sis_url}}', dl_root);
         }
         $(target_menu).prepend('<li class="notify_item'+(dl_notify_list[i].nove=='1'?' notify_unread':'')+'">'+(link!==null?'<a href="'+dl_escape(link)+'" class="notify_link">':'<span class="notify_link">')+'<img src="'+dl_root+'/img/'+dl_notify_list[i].ikona+'" alt="ikonka" width="16" height="16" /><span class="text">'+dl_escape(dl_notify_list[i].text)+'</span><span class="datum">'+dl_notify_list[i].datum+'</span>'+(link!==null?'</a>':'</span>')+'</li>');
   }
   //$(".notify_item:first").addClass("first");
}


function dl_notify_add(text,text_multi,ikona,link,datum,modul,nove)
{
   if(typeof nove == 'undefined') nove = '1';
   var dnes = new Date();
   var dd = ''+dnes.getDate();
   var mm = ''+(dnes.getMonth()+1); //Leden je 0!
   var yyyy = dnes.getFullYear();
   var min = ''+dnes.getMinutes();
   var hour = ''+dnes.getHours();
   if(dd.length<2) dd = '0' + dd;
   if(mm.length<2) mm = '0' + mm;
   dnes = dd + '.' + mm + '.' + yyyy;
   if(datum.indexOf(dnes)==0)
   {
         datum = datum.substr(dnes.length + 1);
         datum_hour = datum.substr(0,2)*1;
         datum_min = datum.substr(3,2)*1;
         if(datum_hour == hour)
         {
               var delta_min=min-datum_min;
               datum = dl_lang['stev.notify.before'].replace('<min>',delta_min);
         }
   }

   if(ikona == null)
   {
         if(modul !== null)
         {
               ikona = modul+'.gif';
         }
         else
         {
               ikona = 'ico_n_lightbulb.png';
         }
   }
   else
   {
         ikona =  'ico_'+ikona+'.png';
   }

   if(text_multi == null)
   {
      text_multi = text;
   }

   dl_notify_list.push({text:text,text_multi:text_multi,ikona:ikona,link:link,datum:datum,modul:modul,nove:nove});
}

function dl_notify_clear()
{
   $('.notify_item').remove();
   dl_notify_list = [];
}

function dl_notify_click()
{
   $('#stev_notify_counter').hide();
   $('#stev_notify').removeClass('new');
   if(dl_notify_bar_visible)
   {
         dl_notify_bar_hide();
   }
   else
   {
         dl_notify_bar_load();
   }
}

function dl_notify_bar_load()
{
   var tags = {
      "<sis_session>": "id="+dl_id+"&tid="+dl_tid+"&",
      "<sis_url>" : dl_root,
      "{{sis_session}}" : "id="+dl_id+"&tid="+dl_tid+"&",
      "{{sis_url}}" : dl_root,
   };


   $.get(dl_root+'/stev/rest.php?id='+dl_id+'&tid='+dl_tid+'&do=notify&last_read='+dl_notify_last_read+'&response_fmt=json',
         function(resp)
         {
               if(resp['status']=='OK')
               {
                     dl_notify_clear();
                     for(var i=0;i<resp['data'].length;i++)
                     {
                           var link = resp['data'][i]['link'];
                           for(var t in tags)
                           {
                                 link = link.replace(t,tags[t]);
                           }
                           dl_notify_add(resp['data'][i]['text'],resp['data'][i]['text_multi'],resp['data'][i]['ikona'],link,resp['data'][i]['cas'],resp['data'][i]['modul'],resp['data'][i]['nove']);
                           dl_notify_last_read = resp['data'][i]['id'];
                     }
                     if(resp['data'].length==0)
                     {
                           $('#zadnenove').show();
                     }
                     else
                     {
                           $('#zadnenove').hide();
                     }
                     dl_notify_list_generate();
                     dl_notify_bar_show();
               }
               else
               {
                     alert('Seznam notifikací nelze načíst, nastala chyba :-(.');
               }
         }
   );
}

function dl_notify_bar_show()
{
   $('#stev_notify').addClass('sel');
   $('#stev_notify_bar').show(100);
   $('#stev_notify_place').show(100);
   dl_notify_bar_visible = true;
}
function dl_notify_bar_hide()
{
   if(dl_notify_bar_visible)
   {
      $('#stev_notify').removeClass('sel');
      $('#stev_notify_bar').hide(100);
      $('#stev_notify_place').hide(100);
   }
   dl_notify_bar_visible = false;
}

function dl_notify_show(){
   if(dl_notify_pocet == 0)
   {
         $('#stev_notify_counter').hide();
         $('#stev_notify').removeClass('new');
   }
   else
   {
         $('.stev_notify').addClass('new'); $('#stev_notify_counter').show().html(dl_notify_pocet);
   }
}



function dl_notify_init()
{
   $(window).blur(function(){
      dl_notify_window_active = false;
      dl_notify_check_schedule();
   });

   $(window).focus(function(){
      dl_notify_window_active = true;
      dl_notify_check();
   });
   $('#stev_notify').click(dl_notify_click);
   dl_notify_show();
   dl_notify_check_schedule();
   $('body').click(
      function(e){
            var el=getEventSourceElement(e);
            var d=getE('stev_notify_bar');
            var n=$('#stev_notify').get(0);
            if(!isChildOf(el,d) && el!=d && el!=n){
                  dl_notify_bar_hide();
            }
      }
   );
}

var dl_entity_map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

function dl_escape(string)
{
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return dl_entity_map[s];
    });
}


/**
 * Zobrazí/skryje loading při dlouhotrvající JS operaci
 * @param boolean show Zobrazit nebo skrýt?
 */
function dl_loading(show)
{
   if(show)
   {
      removeRegDiv("loading");
      ShowHide('loading',1);
      if(!dl_pie)
      {
            $("#loading").css({top:($(window).scrollTop()+200)+"px"},100);
      }
      window.setTimeout(function(){addRegDiv("loading");},1000);
   }
   else
   {
      ShowHide('loading',0);
   }
}

function pie_autocomp_placeholder(name)
{
   if($("#"+name).val()=="" || !$("[data-object="+name+"]").is(".param_multi"))
   {
        $("#"+name+"_autocomplete").attr("placeholder",dl_lang["stev.autocomplete.placeholder"]);
   }
   else
   {
        $("#"+name+"_autocomplete").attr("placeholder",dl_lang["stev.autocomplete.more.placeholder"]);
   }
}

/**
 * Invertuje checkboxy. Nutné pro správnou funkčnost pie režimu.
 * @param string selector JQuery selector pro prvky
 */
function dl_invert_checked(selector)
{
   $(selector).each(function (i,e){ dl_set_checked(e,!$(e).prop('checked'));});
}

/**
 * (od)nastaví checked k checkboxu Nutné pro správnou funkčnost pie režimu.
 * @param string selector JQuery selector pro prvky
 * @param boolean value True/False pro zaškrtnutí/odškrtnutí
 */
function dl_set_checked(selector,value)
{
   $(selector).prop("checked",value);
}


/**
 * Obnoví vzhled SELECT prvků po úpravách jako vkládání/ubírání položek
 * @param string JQuery selector pro prvky
 */
function dl_refresh_select(selector)
{
   if(!dl_pie || !dl_config["stev"]["pie"]["form_select"])
   {
         return;
   }
   $(selector).each(function(i,e){
      var opts = [];
      $(e).find("option").each(function(i2,e2){
         opts.push([$(e2).text(),$(e2).val()]);
      });
      $(e).setOptionsVal(opts);
      $(e).parents(".ffSelectWrapper").css("width",$(e).getHiddenCssWidth());
   });
}


/**
 * Zkopiruje obsah prvku (typicky tabulku) do schranky - vyberem uzlu se zachova HTML struktura,
 * takze vlozeni do Excelu/Calcu vytvori bunky. Vola se z onclick (inline <script> v AJAX hintu nebezi).
 */
function dl_copy_table_to_clipboard(id)
{
   var el = getE(id);
   if (!el)
   {
      return false;
   }
   var range = document.createRange();
   range.selectNode(el);
   var sel = window.getSelection();
   sel.removeAllRanges();
   sel.addRange(range);
   try
   {
      document.execCommand('copy');
   }
   catch (e)
   {
   }
   sel.removeAllRanges();
   return false;
}

function html_img(obr,img_param,alt)
{
   if(dl_config.stev.resource_location != "")
   {
         obr = dl_config['stev']['resource_location']+'img/'+obr;
   }
   else
   {
         obr = dl_root + '/img/' + obr;
   }

   return '<img src="'+obr+'" '+img_param+' alt="'+alt+'" title="'+alt+'">';
}

function dl_add_pie_switch()
{
      var btnPie = document.createElement('img');
      btnPie.style.cursor = "pointer";
      btnPie.title="Přepnout grafický režim";
      btnPie.style.marginRight="3px";
      btnPie.src=dl_root+"/img/ico_pie.png";

      var set_debug_pie_url=dl_root+"/index.php?id="+dl_id+"&tid="+dl_tid+"&do=stev_debug_pie";

      $(btnPie).click(function(){
         $.get(set_debug_pie_url,  function(d){
            document.location.reload();
         });
      });


      $("#sis_plus_icons").append(btnPie);
}

var hash_params = {};
if (location.hash.length > 1)
{
    for (var i = 0, pairs = location.hash.substr(1).split("&"); i < pairs.length; ++i)
    {
        var pair = pairs[i].split(":");
        hash_params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
}

function takeScreenshot(popis)
{
      popis = popis?popis:'';
      html2canvas(document.body, {
         onrendered: function(canvas)
         {
            $.redirectPost(dl_root+'/report.php?id='+dl_id+'&tid'+dl_tid,{
               id: dl_id,
               tid: dl_tid,
               'do': 'ajax_kontrola',
               popis: popis,
               screenshot: canvas.toDataURL(),
               url:      dl_page_info.url,
               module:   dl_page_info.module,
               postdata: dl_page_info.postdata,
               getdata : dl_page_info.getdata
            });

            // getE('dia_cont').appendChild(canvas);
         },
         width: 300,
         height: 300
      });

      p = new Popup();
      d=document.createElement('div');
      d.id='dia_cont';
      d.innerHTML = dl_lang["stev.hlaseni_pripravuji"];
      d.style.padding = '10px';
      p.content = d;
      p.hasCloseButton = false;
      p.open();

      return false;
}

$(document).ready(function(){
   $('input, textarea').placeholder();
   if(dl_pie_switch)
   {
         dl_add_pie_switch();
   }

   $("[data-binds]").each(function(i,e){
            var obj = $(e).attr("data-object");
            if(!obj)
            {
                  return;
            }
            var bind_vars = $(e).attr("data-binds");
            if(bind_vars.indexOf(",")>-1)
            {
                  bind_vars = bind_vars.split(",");
            }
            else
            {
                  bind_vars = [bind_vars];
            }
            for(var i=0;i<bind_vars.length;i++)
            {
                  $("#"+bind_vars[i]).change(function(){
                           $("#"+obj+"_autocomplete").data('uiAutocomplete')._trigger('change');
                  });
            }
   });

});

$(document).ready(function(){
   $(".form_select.param_naseptavac").each(function(i,e){
      var sname=$(e).attr("data-object");
      if(sname)
      {
         var povinne = $("[data-object="+sname+"]").hasClass("jepovinne");
               var sel = function( event, ui ) {
                        if(ui.item && ui.item.value == "" && ui.item.label == "---") { ui.item.label = ""; }
                        $( "#"+sname+"_autocomplete").val(ui.item.nazev);
                        $( "#"+sname).val(ui.item.value);
                        eval("form_orig_"+sname+" = ui.item.value;");
                        eval("form_origname_"+sname+" = ui.item.nazev;");
                        if(ui.item.change)
                        {
                              for(var c in ui.item.change)
                              {
                                    $("#"+c+"_autocomplete").autocomplete("search", ui.item.change[c]);
                              }
                        }
                        return false;
                      };

               $("#"+sname+"_autocomplete").change(function(){
                  if($(this).val() == "")
                  {
                        $("#"+sname+"_autocomplete").data("uiAutocomplete")._trigger("change");
                  }
               }).keypress(function(event){
                  if(event.which == 13)
                  {
                        var p = $("#"+sname+"_autocomplete").val().length;
                        $("#"+sname+"_autocomplete").selectRange(p,p);
                        return false;
                  }
               }).autocomplete({
                     minLength: 1,
                     response: function(event, ui) {
                           if (ui.content.length == 1)
                           {
                                 var oldval = $("#"+sname+"_autocomplete").val();
                                 sel("select",{item:ui.content[0]});
                                 var newval = $("#"+sname+"_autocomplete").val();
                                 if(newval.toLowerCase().indexOf(oldval.toLowerCase())==0)
                                 {
                                       $("#"+sname+"_autocomplete").selectRange(oldval.length,newval.length);
                                 }
                                 $(this).autocomplete("close");
                           }
                     },
                     source: function (request, response) {
                        var bind_vars = $("[data-object="+sname+"]").attr("data-binds");
                        if(bind_vars)
                        {
                              bind_vars = bind_vars.split(",");
                        }
                        else
                        {
                              bind_vars = [];
                        }
                        var get_params = {
                            query: request.term,
                            'do': "dialog_autocomplete",
                            id: dl_id,
                            tid: dl_tid,
                            dlg_nazev: "select",
                            dlg_kod: sname,
                            kod: $("#"+sname).val()
                        };
                        for(var i=0;i<bind_vars.length;i++)
                        {
                              get_params["bind:"+bind_vars[i]] = $("#"+bind_vars[i]).val();
                        }

                        $.get(dl_root+"/stev/rest.php", get_params, function (data) {
                            response(data);
                        });
                      },
                     select: sel,
                     change: function(event,ui){
                              if(ui.item && ui.item.value == "" && ui.item.nazev == "---") { ui.item.nazev = ""; }
                              if($("#"+sname+"_autocomplete").val()=="" && !povinne)
                              {
                                    eval("form_orig_"+sname+" = \"\";");
                                    eval("form_origname_"+sname+" = \"\";");
                                    $("#"+sname).val("");

                              }
                              else
                              {
                                    if(ui.item)
                                    {
                                           $("#"+sname).val(eval("form_orig_"+sname+" = ui.item.value"));
                                           $("#"+sname+"_autocomplete").val(eval("form_origname_"+sname+" = ui.item.nazev"));
                                           $("#"+sname).change();
                                    }
                                    else
                                    {
                                          $("#"+sname).val(eval("form_orig_"+sname));
                                          $("#"+sname+"_autocomplete").val(eval("form_origname_"+sname));
                                          $("#"+sname).change();
                                    }
                              }
                           }
                  });
      }
   });

});


function dl_get_url_params(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        try {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }catch(e) {
            //na Win1250 stránce to může selhat :-(. decodeURIComponent umí háčky a čárky jen v utf-8 apod.
            //TODO: Nějak to ochcat. Našel jsem pouze řešení ve formě vložení JS knihovny, která dělá iconv. Ta je ale velká.
        }
    }

    return params;
}

//POZOR: Tohle nefunguje na win1250 databázi :-(
var dl_get = dl_get_url_params(document.location.search);


//Nastavení vybraného textu v textu inputu/textarea - plugin do jquery
$.fn.selectRange = function(start, end) {
    if(!end) end = start;
    return this.each(function() {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};


var DL_EMPTY_ORDER = '-n-';

$(document).ready(function(){
      $(".form_pagination select").each(function(){
         $(this).attr('data-old-val',this.value);
      });
      $(".form_pagination select").change(function(){
         var oldval = $(this).attr('data-old-val');

         if(this.value == DL_EMPTY_ORDER){
            if(!confirm(dl_lang["stev.page_unlimited.warning"]))
            {
               this.value = oldval;
               return;
            }
         }
         $(this).attr('data-old-val',this.value);
      });
});

function dl_clear_podcarnik(podcarnik,objekty)
{

   $(podcarnik).find(".filterItem").each(function(i,e){
      dl_clear_podcarnik_item(podcarnik,objekty,$(e));
   });
   //$(podcarnik).fadeOut();
}

function dl_clear_podcarnik_item(podcarnik,objekty,objs)
{

   $(objs).each(function(index,obj){
         var name = $(obj).attr("data-name");
         var key = $(obj).attr("data-key");
         var orig = $('*[data-object='+name+']');
          if(orig.hasClass("form_select") && !orig.hasClass("param_empty_option"))
          {
              return;
          }

           if(orig.hasClass("form_dialog"))
         {
               if(orig.hasClass("param_multi"))
               {
                     dialog_multi_remove(name,$(orig).attr("data-dlg_nazev"),key);
               }
               else
               {
                     dlg_clear(name,$("#"+name).attr("data-dlg_nazev"));
               }
         }
         else
         {
             if(orig.hasClass("param_checkbox_style"))
             {
                 dl_set_checked("[name=" + name + "\\[\\]]", false);
             }
             if (key)
             {
                 dl_set_checked("#" + name + "_" + key, false);
                 if (dl_config["stev"]["pie"]["form_select"])
                 {
                     $("select#" + name).setVal("");
                 }
                 else
                 {
                     $("select#" + name).find("option[value=" + key + "]").removeAttr('selected');
                 }
             }
             else
             {
                 dl_set_checked("#" + name, false);
                 $("#" + name).filter(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
             }
         }

         $(obj).fadeOut();
         dl_podcarnik_update(podcarnik,objekty);
   });
}

function dl_podcarnik_update(podcarnik,objekty)
{
   var ul=$(podcarnik).find("ul");
   ul.empty();
   var isempty = true;

   $(objekty).each(function(i,e){
         var li=$('<li></li>').append('<strong>'+$(e).attr("data-title")+':</strong>').append(" ");
         var val = null;
         var makrizek = true;

         if($(e).hasClass("form_dialog"))
         {
               if($(e).hasClass("param_multi"))
               {
                     var dtitly = dialog_multi_get_nazvy($(e).attr("data-object"));
                     var dkody = dialog_multi_get_kody($(e).attr("data-object"));
                     if(dtitly.length>0)
                     {
                           val = {};
                           for(var k=0;k<dtitly.length;k++)
                           {
                                 val[dkody[k]] = dtitly[k];
                           }
                     }
               }
               else
               {
                     var dkod = $(e).find("#"+$(e).attr("data-object")).val();
                     var dtitle = $(e).find(".form_dialog_nazev").text();
                     if((dtitle == "" || dtitle == " - ") && $(e).hasClass("mimo_ciselnik"))
                     {
                           dtitle = dkod;
                     }
                     if(dkod !== "")
                     {
                           val = dtitle;
                     }
               }
         }
         else if($(e).hasClass("form_text") || $(e).hasClass("form_datetime"))
         {
               val = $(e).find('input[type=text]').val();
               if(val == "")
               {
                     val = null;
               }
         }
         else if($(e).hasClass("form_textarea"))
         {
               val = $(e).find('textarea').text();
               if(val == "")
               {
                     val = null;
               }
         }
         else if($(e).hasClass("form_radio"))
         {
               $(e).find('input[type=radio]:checked').each(function(i2,r){
                  val = $(r).attr("data-title");
                  makrizek = false;
               });
         }
         else if($(e).hasClass("form_checkbox"))
         {

               var cs = $(e).find(":checkbox");
               if(cs.length == 1)
               {
                     if(cs.prop("checked"))
                     {
                           val = (dl_lang_id==="cs"?"ano":"yes");
                     }
               }
               else
               {
                     cs.each(function(i2,c){
                           if($(c).prop("checked"))
                           {
                                 if(val === null)
                                 {
                                       val = {};
                                 }
                                 val[$(c).attr("value")] = $(c).attr("data-title");
                           }
                     });
               }
         }
         else if($(e).hasClass("form_select") || $(e).hasClass("form_select_multiple"))
         {
               $(e).find("select option:selected").each(function(i2,o)
               {
                     var oval = $(o).attr("value");
                     var otitle = $(o).text();
                     if(oval == "" && otitle == "---")
                     {
                           return;
                     }
                     if(val === null)
                     {
                           val = {};
                     }
                     val[oval] = ($(o).text());
               });
               if(!$(e).hasClass("param_empty_option"))
               {
                    makrizek = false;
               }
         }
         if(val !== null)
         {
               var pocet=0;
               if((typeof val) === "string")
               {
                     pocet++;
                     if(val.lastIndexOf("(")>-1)
                     {
                         val = val.substring(0,val.lastIndexOf("("));
                     }
                     li.append('<span class="filterItem" data-name="'+$(e).attr("data-object")+'">'+val+(makrizek?' <span class="icon icon-krizek" title="'+dl_lang["stev.filtr.podcarou.odstranit"]+'"></span>':'')+'</span>');
                     isempty = false;
               }
               else if((typeof val) === "object")
               {
                     for(var key in val)
                     {
                         pocet++;
                         if(val[key].lastIndexOf("(")>-1)
                         {
                             val[key] = val[key].substring(0,val[key].lastIndexOf("("));
                         }
                         li.append('<span class="filterItem" data-name="'+$(e).attr("data-object")+'" data-key="'+key+'">'+val[key]+(makrizek?' <span class="icon icon-krizek" title="'+dl_lang["stev.filtr.podcarou.odstranit"]+'"></span>':'')+'</span>');
                     }

                     isempty = false;
               }
               if(pocet>0)
               {
                     if(pocet>1)
                     {
                           li.append('<span class="pieicon pieicon-ico_delete pieicon-regular cancelFilterItem" title="'+dl_lang["stev.filtr.podcarou.odstranitradek"]+'"></span>');
                     }
                     li.appendTo(ul);
               }
         }
   });

   ul.find(".filterItem .icon-krizek").on("click",function(){
			dl_clear_podcarnik_item(podcarnik,objekty,$(this).parent(".filterItem"));
		});

   ul.find(".cancelFilterItem").on("click",function(){
      dl_clear_podcarnik_item(podcarnik,objekty,$(this).siblings(".filterItem"));
   });


   if(isempty)
   {
         $(podcarnik).fadeOut();
   }
   else
   {
         $(podcarnik).fadeIn();
   }
   //$(podcarnik).find(".filterChangedInfo").fadeIn();
}

function dl_oznac_odeslano(e)
{
   $(e).addClass("odeslano");
   $(e).css({ opacity: 0.5 });
}

function dl_odoznac_odeslano(e)
{
   $(e).removeClass("odeslano");
   $(e).css({ opacity: 1 });
}

function dl_podcarnik_init(podcarnik,objekty,odesilaciTlacitka,aktualizovatPriOnChange)
{
   if (aktualizovatPriOnChange)
   {
       $(objekty).find("input,textarea,select").change(function () {
           dl_podcarnik_update(podcarnik, objekty);
           $(odesilaciTlacitka).each(function (i, e) {
               dl_odoznac_odeslano(e);
           });
       });
   }




   $(podcarnik).find(".filterItem .icon-krizek").on("click",function(){
			dl_clear_podcarnik_item(podcarnik,objekty,$(this).parent(".filterItem"));
		});

   $(podcarnik).find(".cancelFilterItem").on("click",function(){
      dl_clear_podcarnik_item(podcarnik,objekty,$(this).siblings(".filterItem"));
   });

   $(podcarnik).find(".cancelFilter").on("click",function(){
                 dl_clear_podcarnik(podcarnik,objekty);
		});
}




function init_schovavace() {
   if(dl_pie)
   {
      return;
   }
		var openClass = "open";
		$("ul.list li:not(." + openClass + ") > .content, table.list tbody:not(." + openClass + ") > tr + tr > td > .content").css("display","none");
		$("ul.list li .heading").on("click",function(){
			var _this = this;
			if ($(this).parent("li").hasClass(openClass)) {
				$(this).parent("li").find(".content").first().hide(0,function(){
					$(_this).parent("li").removeClass(openClass);
				});
			}
			else {
				$(this).parent("li").addClass(openClass);
				$(this).parent("li").find(".content").first().show();
			}
		});
		$("table.list tbody > tr:first-child").on("click",function(){
			var _this = this;
			if ($(this).parent("tbody").hasClass(openClass)) {
				$(this).parent("tbody").find(".content").first().hide(0,function(){
					$(_this).parent("tbody").removeClass(openClass);
				});
			}
			else {
				$(this).parent("tbody").addClass(openClass);
				$(this).parent("tbody").find(".content").first().show();
			}
		});
	};

$(document).ready(function(){
 init_schovavace();
});



//kontrola html ve form_textarea:
$(document).ready(function(){
   $(".param_check_html textarea").blur(function(){
         var hval = this.value;
         var hid = this.id;
         var aCheckType = eval($(this).closest(".param_check_html").attr("data-param_check_html"));
         var aPovoleneTagy = $(this).closest(".param_check_html").attr("data-param_check_html_add_tags");
         if(typeof aPovoleneTagy == "undefined")
         {
               aPovoleneTagy = '[]';
         }
         var povoleneTagy = eval(aPovoleneTagy);

         if(aCheckType == "autofix") {
            var d = dl_html_tidy(hval, povoleneTagy);
            if (d.fixed) {
               this.value = d.html;
            }
         }

         if(aCheckType == "suggest") {

            window.setTimeout(function () {
               var d = dl_html_tidy(hval, povoleneTagy);
               $("#" + hid + "_fixed_html").remove();
               if (d.fixed) {

                  $("#" + hid).after("<p class=\"html_check\" id=\"" + hid + "_fixed_html\"></p>");


                  var problemTxt = "";

                  $up = $("<ul></ul>");
                  for (var i = 0; i < d.problems.length; i++) {
                     $li = $("<li></li>").text(d.problems[i]);
                     $up.append($li);
                  }

                  //harakiri escapování pro html_hint:
                  var problemTxt = "<strong>" + dl_lang["stev.form.html_check.problems"] + "</strong><ul>" + $up.html() + "</ul>";
                  problemTxt = problemTxt.replace(/'/g, "\\'");
                  problemTxt = $("<div />").text(problemTxt).html();
                  problemTxt = problemTxt.replace(/\r/g, "\\r");
                  problemTxt = problemTxt.replace(/\n/g, "\\n");
                  problemTxt = problemTxt.replace(/"/g, "&quot;");

                  var $hint = $("<img src=\"" + dl_root + "/img/div_tip.gif\" style=\"cursor: help; margin-left: 3px;\" onmousemove=\"ShowHint('hint',this.id,0,'" + problemTxt + "');\" onmouseout=\"HideHint('hint');\" >");

                  var $sp = $("<strong style=\"color:red;\">" + dl_lang["stev.form.html_check"] + "</strong>");
                  var $nu = $("<strong>" + dl_lang["stev.form.html_check.navrh"] + "</strong>");


                  $fixBtn = $("<input id=\"" + hid + "_fix_html_button\" class=\"but_save\" type=\"button\" />");
                  $fixBtn.val(dl_lang["stev.form.html_check.pouzit"]);


                  $fixBtn.mousedown(function () {
                     $("#" + hid + "_fixed_html").hide();
                     $("#" + hid).val(d.html);
                  });

                  $showFixBtn  = $("<input id=\"" + hid + "_show_suggest_button\" class=\"but_find\" type=\"button\" />");
                  $showFixBtn.val(dl_lang["stev.form.html_check.navrhnout"]);

                  $dfixed = $("<div />").addClass("div_fixed_html").append($nu).append("<textarea class=\"fixed_html\"></textarea>").append("<br />").hide();

                  $("#" + hid + "_fixed_html").append($sp).append($hint).append("&nbsp;").append($showFixBtn).append($dfixed).append("&nbsp;").append($fixBtn);




                  $ta = $("#" + hid + "_fixed_html").find("textarea.fixed_html");
                  $ta.addClass($("#" + hid).attr("class"));
                  $ta.attr("style", $("#" + hid).attr("style"));
                  $ta.attr("rows", $("#" + hid).attr("rows"));
                  $ta.attr("cols", $("#" + hid).attr("cols"));
                  $ta.css({"background-color": "#cfc"});
                  $ta.prop("readonly", true);
                  $("#"+hid + "_show_suggest_button").mousedown(function(){
                     $("#" + hid + "_fixed_html").find(".div_fixed_html").show();
                     $(this).hide();
                  });


                  $("#" + hid + "_fixed_html").find("textarea.fixed_html").val(d.html);

               }


            }, 20);
         }
         return true;


   });
});

//hlaseni chyb kliknutim na kod hashe apod.
$(document).ready(function(){
   if(dl_config["stev"]["report_problem"]) {
       $(".sis_error_hash_report,.sis_error_hash").css({cursor: "pointer"}).click(function () {
           var hashe = [];
           $(".sis_error_hash").each(function (i, e) {
               hashe.push($(e).html());
           });
           takeScreenshot("\r\n\r\n\r\nID:" + hashe.join(", "));
       });
   }
});

function dialog_multi_or_text_add(dlg_kod,val,txt)
{
    $rem = $(html_img("ico_minus.png","","")).addClass("remove_row");
    $rem.click(function(){
        $(this).closest("tr").remove();
    });
    $obj = $(".form_dialog_multi_or_text[data-object='"+dlg_kod+"']");
    $existing = $obj.find("input[type=hidden][value='"+val+"']");
    if($existing.length > 0)
    {
        return;
    }
    $prev_tr = $obj.find(".add_text").closest("tr");
    $td = $("<td />");
    $tr = $("<tr />");
    $td.append($rem);
    $tr.append($td);
    $tr.append("<td>"+'<input type="hidden" name="'+dlg_kod+'[]" value="'+val+'"/>'+txt+"</td>");
    $prev_tr.before($tr);
}

/**
 * Generuje náhodný jednoznačný identifikátor
 * @returns {string}
 */
function dl_unique_id()
{
    // desired length of Id
    var idStrLen = 32;
    // always start with a letter -- base 36 makes for a nice shortcut
    var idStr = (Math.floor((Math.random() * 25)) + 10).toString(36) + "_";
    // add a timestamp in milliseconds (base 36 again) as the base
    idStr += (new Date()).getTime().toString(36) + "_";
    // similar to above, complete the Id using random, alphanumeric characters
    do {
        idStr += (Math.floor((Math.random() * 35))).toString(36);
    } while (idStr.length < idStrLen);

    return (idStr);
}

function dialog_multi_or_texts_add(dlg_kod,val,txt)
{
    $rem = $(html_img("ico_minus.png","","")).addClass("remove_row");
    $rem.click(function(){
        $(this).closest("tr").remove();
    });
    $obj = $(".form_dialog_multi_or_texts[data-object='"+dlg_kod+"']");
    $span_defs = $obj.find("span.defs");
    let kod_name = $span_defs.attr("data-kod");
    let css_class = $span_defs.attr("data-class");
    let text_defs = JSON.parse($span_defs.attr("data-text-definition"));


    $existing = $obj.find("input[type=hidden][name*='["+kod_name+"]'][value='"+val+"']");
    if($existing.length > 0)
    {
        return;
    }
    $prev_tr = $obj.find(".add_text").closest("tr");
    $td = $("<td />");
    $tr = $("<tr />");
    $td.append($rem);
    $tr.append($td);
    $td2 = $("<td />");
    let uid = dl_unique_id();
    $td2.append('<input type="hidden" name="'+dlg_kod+'['+uid+']['+kod_name+']" value="'+val+'"/>');
    if ($obj.hasClass("param_souhlas"))
    {
        $td2.append('<select class="'+css_class+'" name="' + dlg_kod + '[' + uid + '][SOUHLAS]"><option value="A">' + (dl_lang_id === "en" ? "Yes" : "Ano") + '</option><option value="N">' + (dl_lang_id === "en" ? "No" : "Ne") + '</option></select>');
    }
    for (text_id in text_defs)
    {
        if (text_defs.hasOwnProperty(text_id))
        {
            $td2.append('<input type="hidden" name="'+dlg_kod+'['+uid+']['+text_id+']" value=""/>');
        }
    }
    $td2.append(txt);
    $tr.append($td2);
    $prev_tr.before($tr);
}

var dl_allow_leave = -1; //-1 výchozí, 1 = ano, 0 = ne, zobrazit hlášku

$(document).ready(function(){

    //hláška o opuštění formuláře
    dl_addEventListener('beforeunload',window,function(e)
    {
        if(dl_allow_leave == -1 || dl_allow_leave == 1)
        {
            return undefined;
        }
        var confirmationMessage = dl_lang["stev.leave_form"];
        (e || window.event).returnValue = confirmationMessage; //Gecko + IE
        return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });

    $(".form_dialog_multi_or_text .remove_row").click(function(){
        $(this).closest("tr").remove();
    });

    $(".form_dialog_multi_or_texts .remove_row").click(function(){
        $(this).closest("tr").remove();
    });

    $(".form_dialog_multi_or_text .add_text").click(function(){

        let pridavne_za_text = $(this).closest("table").attr("data-pridavne_za_text");
        let text_class = $(this).closest("table").attr("data-textclass");
        if ((typeof text_class) === "undefined")
        {
            text_class = "";
        }
        if ((typeof pridavne_za_text) === "undefined")
        {
            pridavne_za_text = "";
        }

        $rem = $(html_img("ico_minus.png","","")).addClass("remove_row");
        $rem.click(function(){
            $(this).closest("tr").remove();
        });
        $td = $("<td />");
        $tr = $("<tr />");
        $td.append($rem);
        $tr.append($td);
        var obj_name = $(this).closest(".form_obj").attr("data-object");
        $tr.append('<td><input type="text" name="'+obj_name+'[]" size="100" maxlength="'+$(this).closest(".form_dialog_multi_or_text").attr("data-param_size")+'" class="' + text_class + '">' + pridavne_za_text + '</td>');
        $(this).closest("tr").before($tr);
        $tr.find("input").focus();
        return false;
    });

    $(".form_dialog_multi_or_texts .add_text").click(function(){
        $rem = $(html_img("ico_minus.png","","")).addClass("remove_row");
        $rem.click(function(){
            $(this).closest("tr").remove();
        });
        $td = $("<td />");
        $tr = $("<tr />");
        $td.append($rem);
        $tr.append($td);
        var obj_name = $(this).closest(".form_obj").attr("data-object");

        let $span_defs = $(this).closest(".form_obj").find("span.defs");
        let text_defs = JSON.parse($span_defs.attr("data-text-definition"));
        let kod_name = $span_defs.attr("data-kod");
        let css_class = $span_defs.attr("data-class");

        $td2 = $("<td />");

        let uid = dl_unique_id();
        $td2.append('<input type="hidden" name="'+obj_name+'['+uid+']['+kod_name+']">');
        if ($(this).closest(".form_obj").hasClass("param_souhlas"))
        {
            $td2.append('<select class="'+css_class+'" name="' + obj_name + '[' + uid + '][SOUHLAS]"><option value="A">' + (dl_lang_id === "en" ? "Yes" : "Ano") + '</option><option value="N">' + (dl_lang_id === "en" ? "No" : "Ne") + '</option></select>');
        }

        for (text_id in text_defs)
        {
            if (text_defs.hasOwnProperty(text_id))
            {
                let text_attr = text_defs[text_id];
                $td2.append(" "+text_attr["title"]+": ");
                $td2.append('<input class="'+css_class+'" type="text" name="' + obj_name + '['+uid+'][' + text_id + ']" size="' + text_attr["size"] + '" maxlength="' + text_attr["maxlength"] + '">');
            }
        }


        $tr.append($td2);
        $(this).closest("tr").before($tr);
        $tr.find("input").focus();
        return false;
    });

    $(".param_hilight_tablerow").find("input").focus(function(){
        $(this).closest("table").find("tr").removeClass("row-hilight");
        $(this).closest("tr").addClass("row-hilight");
    });


    $(".form_obj").each(function(i,e){
        $obj = $("#" + $(e).attr("data-object").replace("[]", ""));
        $obj.change(function(){
            //$err_label = $("#err_"+$(this).attr("id"));
            //$err_label.removeClass("nezmenena_spravne");
            //removeClass("nezmenena_spravne")
            $(e).find(".form_dialog_nazev").attr("title","");
            $(this).removeClass("platnost_neplatny").removeClass("platnost_neplatny").removeClass("platnost_nezavedeny");
        });
    });

    var $it = $(".form_obj.platnost_expirovany .form_dialog_nazev")
    var title = $it.attr("title");
    if(typeof title == "undefined")
    {
        title = "";
    }
    else
    {
        title += ", ";
    }
    title += dl_lang["stev.dlg_expirovane"];
    $it.attr("title",title);

    $it = $(".form_obj.platnost_neplatny .form_dialog_nazev");
    var title = $it.attr("title");
    if(typeof title == "undefined")
    {
        title = "";
    }
    else
    {
        title += " ";
    }
    title += dl_lang["stev.dlg_neplatne"];
    $it.attr("title",title);


    $it = $(".form_obj.platnost_nezavedeny .form_dialog_nazev");
    var title = $it.attr("title");
    if(typeof title == "undefined")
    {
        title = "";
    }
    else
    {
        title += "  ";
    }
    title += dl_lang["stev.dlg_nezavedene"];
    $it.attr("title",title);

    $("tr.platnost_expirovany").attr("title",dl_lang["stev.dlg_expirovane"]);
    $("tr.platnost_neplatny").attr("title",dl_lang["stev.dlg_neplatne"]);
    $("tr.platnost_nezavedeny").attr("title",dl_lang["stev.dlg_nezavedene"]);
});


/**
 * Převede form_range na hvezdickove hodnoceni [*****]
 * @param element  dom element input type="range"
 *
 * @source https://codepen.io/stoumann/pen/yLbYOdz
*/
function dl_star_rating(element)
{
    let param_val = element.getAttribute('value');
    let param_min = element.getAttribute('min');
    let param_max = element.getAttribute('max');

    if (param_val == '' || isNaN(param_val))
    {
        param_val = 0;
    }

    if (param_val < param_min)
    {
        param_val = param_min;
    }
    if (param_val > param_max)
    {
        param_val = param_max;
    }

    element.classList.add('rating');
    element.style.setProperty('--value', param_val); // promitne vychozi hodnotu do prvku
    element.style.setProperty('--stars', param_max); // nastavi pocet hvezdicek dle atributu max

    if (element.nextElementSibling.tagName.toUpperCase() == 'OUTPUT')
    {
        element.parentNode.removeChild(element.nextElementSibling);
    }
    __dl_star_rating_update(element);
}

function __dl_star_rating_update(element)
{
    element.style.setProperty('--value', element.value);
    element.title = element.value + " / " + element.getAttribute('max');
    if (element.nextElementSibling && element.nextElementSibling.tagName.toUpperCase() == 'OUTPUT')
    {
        element.nextElementSibling.value = element.value;
    }
}

/**
 * vykresli vedle input range prvek s hodnotou
 */
document.addEventListener("input", function(e){
    const target = e.target.closest('input[type="range"]'); // Or any other selector.

    if(target)
    {
        __dl_star_rating_update(target);
    }
});

$(document).ready(function(){
//  OidentImgAutoInit.start();
    function initIfNeeded(img) {
        if (!(img instanceof HTMLImageElement)) return;

        const fotoSrc = img.getAttribute("data-foto-src");
        if (!fotoSrc) return;

        if (img.dataset.fotoSrcInitialized === "1") return;
        img.dataset.fotoSrcInitialized = "1";

        img.style.cursor="pointer";
        new xhr_tooltip(img, fotoSrc, "", "' . $udalost . '", true);

    }

    function scan(root) {
        if (!root) return;

        if (root.matches?.("img[data-foto-src]")) initIfNeeded(root);

        root.querySelectorAll?.("img[data-foto-src]").forEach(initIfNeeded);
    }

    // init toho, co už existuje
    scan(document);

    // init toho, co teprve přijde
    new MutationObserver((mutations) => {
        for (const m of mutations) {
            for (const node of m.addedNodes) {
                if (node.nodeType === 1) scan(node);
            }
        }
    }).observe(document.documentElement, { childList: true, subtree: true });

});


// ************************************************************
// ********************  VÝBĚR CHECKBOXŮ SE SHIFTEM  ******************
// ************************************************************

$(document).ready(function() {
    let checkboxes = document.querySelectorAll('.shift-checkbox');
    let lastChecked;
    let isShiftDown = false;

    // Listener pro stisk klávesy Shift
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Shift') {
            isShiftDown = true;
        }
    });

    // Listener pro puštění klávesy Shift
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Shift') {
            isShiftDown = false;
        }
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', (e) => {
            if (isShiftDown && lastChecked && lastChecked !== checkbox) {
                let start = Array.from(checkboxes).indexOf(lastChecked);
                let end = Array.from(checkboxes).indexOf(checkbox);
                let checkboxesToCheck = Array.from(checkboxes).slice(Math.min(start, end), Math.max(start, end) + 1);

                checkboxesToCheck.forEach(checkbox => {
                    checkbox.checked = true;
                });
            }
            lastChecked = checkbox;
        });
    });
});


/**
 * Nacte miniatury fotografii (ty do maji nastaven atribut data-foto-size="small-lazy")
 */
function dl_foto_lazy_load()
{
    let data = [];
    let $lazy_images = $("img[data-foto-size=small-lazy]");
    $lazy_images.each(function (i, e) {
        data.push({
            "ident":$(e).attr("data-foto-ident"),
            "typ":$(e).attr("data-foto-typ"),
            "kdojekdo":$(e).attr("data-foto-kdojekdo")
        });
    });

    if (data.length === 0)
    {
        return;
    }

    $.post(dl_root + "/stev/rest.php",
        {
            "do": "foto_batch",
            "id": dl_id,
            "tid": dl_tid,
            "data": data
        }, function (result) {
            $lazy_images.each(function (i, e) {
                $(e).attr("src", result[i]);
                $(e).attr("data-foto-size", "small"); //aby se znovu nenacitalo
            });
        });
}

/**
 * Propojuje <select data-connect="true"> s HTML prvky obsahujícími:
 *
 * data-connect-select-id="<id_selectu>"
 * data-connect-select-value="<value_option>"
 */
document.addEventListener('DOMContentLoaded', () => {

    function updateConnectedElements(select) {
        const selectId = select.id;
        const selectedValue = select.value;

        document
            .querySelectorAll(`[data-connect-select-id="${selectId}"]`)
            .forEach(element => {
                const targetValue = element.dataset.connectSelectValue;

                element.classList.toggle(
                    'is-hidden',
                    targetValue !== selectedValue
                );
            });
    }

    document.querySelectorAll('select[data-connect="true"]').forEach(select => {

        // inicializace po načtení stránky
        updateConnectedElements(select);

        // reakce na změnu hodnoty
        select.addEventListener('change', () => {
            updateConnectedElements(select);
        });
    });


    // tlačítko <button data-popup-iframe="src"> otevře popup s src
    document.querySelectorAll('button[data-popup-iframe]').forEach(function (element)
    {
        element.addEventListener('click', function (event){
            event.preventDefault();
            let source = element.dataset.popupIframe;
            let w = 900;

            let divIframe=document.createElement('div');
            divIframe.innerHTML = '<iframe src="'+source+'" width="100%" height="600">';
            divIframe.style.position = 'relative';

            let divClose=document.createElement('div');
            divClose.innerHTML = 'X';
            Object.assign(divClose.style, {
                fontSize: '16px',
                position: 'absolute',
                fontWeight: 'bold',
                backgroundColor: 'red',
                color: 'white',
                top: '0',
                right: '0',
                padding: '4px 14px',
                cursor: 'pointer'
            });

            divIframe.appendChild(divClose);

            divClose.addEventListener('click', function (){p.remove();});


            let p = new Popup();
            p.content = divIframe;
            p.hasCloseButton = false;
            p.backgroundClose = true;
            p.open();

            Object.assign(p.divs.main.style, {
                overflowX: 'visible',
                overflowY: 'visible',
                // loader
                backgroundImage: 'url(\'../img/ajax-loader_big.gif\')',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                // zmenim sirku
                width: w+'px',
                marginLeft: '-' + (w/2) + 'px'
            });
        });
    });

});

$(document).ready(function(){
    window.setTimeout(dl_foto_lazy_load, 1000); //zpozdeni, aby se nedelal request hned
});


class OmezHtmlSelect {
    /**
     * @param {string} htmlSelectId  ID zdrojového <select multiple>
     * @param {string} endpointUrl   URL endpointu (např. "api.php")
     * @param {string} endPointParam Název parametru pro hodnoty (např. "sdruh[]")
     * @param {Object} [options]
     * @param {Object.<string, string|number|boolean>} [options.extraParams] dodatečné POST parametry (token, version...)
     * @param {(msg:any)=>void} [options.onError] vlastní error handler
     */
    constructor(htmlSelectId, endpointUrl, endPointParam = 'sdruh[]', options = {}) {
        this.sourceSelectId = htmlSelectId;
        this.endpoint = endpointUrl;
        this.paramName = endPointParam;

        this.extraParams = options.extraParams || {};
        this.onError = options.onError || ((e) => console.error('AJAX error:', e));

        this.lastTargetIds = [];
    }

    exec() {
        const source = document.getElementById(this.sourceSelectId);
        if (!source) return;

        source.addEventListener('change', (e) => this.handleChange(e));
    }

    async handleChange(e) {
        const selectedValues = Array.from(e.target.selectedOptions).map(o => o.value);

        try {
            const data = await this.fetchData(selectedValues);
            this.updateSelects(data);
        } catch (err) {
            this.onError(err);
        }
    }

    async trigger() {
        const source = document.getElementById(this.sourceSelectId);
        if (!source) return;

        // simulujeme event objekt
        await this.handleChange({ target: source });
    }

    async fetchData(values) {
        const body = new URLSearchParams();

        values.forEach(v => body.append(this.paramName, v));

        // pokud je extraParams funkce, zavolej ji
        const extra = (typeof this.extraParams === 'function')
            ? this.extraParams()
            : this.extraParams;

        Object.entries(extra || {}).forEach(([k, v]) => {
            if (Array.isArray(v)) {
                v.forEach(val => body.append(k + '[]', val));
            } else if (v !== null && v !== undefined) {
                body.append(k, String(v));
            }
        });

        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            body
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    }

    updateSelects(data) {
        this.lastTargetIds = Object.keys(data || {});
        this.lastTargetIds.forEach(id => {
            const sel = document.getElementById(id);
            if (!sel || sel.tagName !== 'SELECT') return;
            this.populateSelect(sel, data[id]);
        });
    }

    populateSelect(select, optionsMap) {
        let nm = select.id;


        let _obj = false;
        try { // kontrola zda je cílový select třídící - $frm->set_param form_select_multiple::PARAM_SORTER
            _obj = eval(nm+'_obj'); // sáhnu na js globální proměnnou
        }
        catch (e) // globální proměnná neexistuje - není
        {
            _obj = false;
        }


        if (_obj) // pokud je to třídící select, naplň mu js data pro třídění a také jeho obsah
        {
            _obj.optstyle = [];
            _obj.data = [];

            _obj.data = Object.entries(optionsMap).map(([key, value]) => ({
                key: value.kod,
                value: value.nazev
            }));

            dl_select_order(select.id, _obj); // dvojité zavolání třídění převede z pole klic=>hodnota na formát "klic hodnota"
            dl_select_order(select.id, _obj); // a zpět na "hodnota (klic)
        }
        else // nejde o třídící select, naplň ho klasicky
        {
            select.innerHTML = '';
            Object.entries(optionsMap || {}).forEach(([value, label]) => {

                const opt = document.createElement('option');
                opt.value = label.kod;
                opt.textContent = label.nazev;
                select.appendChild(opt);
            });
        }
    }

    clearTargets() {
        this.lastTargetIds.forEach(id => {
            const sel = document.getElementById(id);
            if (sel && sel.tagName === 'SELECT') sel.innerHTML = '';
        });
    }
}