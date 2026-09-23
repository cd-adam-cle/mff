XmlHttpRequest = null;

if (window.XMLHttpRequest)
{
   XmlHttpRequest = new XMLHttpRequest();
}
else if (window.ActiveXObject)
{
   try
   {
      XmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
   }
   catch (error)
   {
      XmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
   }
}



function ajaxCore()
{
   this.ajaxRequest = function (url, param)
   {
      try
      {
         if(XmlHttpRequest.readyState == 0 || XmlHttpRequest.readyState == 4)
         {
            XmlHttpRequest.onreadystatechange = this.ajaxResponse;
            XmlHttpRequest.open('POST', url, true);
            XmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;');
            XmlHttpRequest.send(param);

            return true;
         }
      }
      catch(e)
      {
         alert(e.description);
      }
      return false;
   };

   //////////////////////////////////////////////////////////////////////////////////

   this.objectEvent = function (object_id, event)
   {
      var object = document.getElementById(object_id);

      if(object != null && event != "")
      {
         var param = "ObjectId=" + object_id + "&Event=" + event + "&ObjectValue=" + object.value;

         this.ajaxRequest('ajx.php', param);
      }
   };


   this.submitForm = function (form_id, action)
   {
      form_object = document.getElementById(form_id);

      if(form_object != null)
      {
         var post_str = this.getFormValues(form_object);

         //alert(action + '?' + post_str);
         this.ajaxRequest(action, post_str);
      }
   };


   this.getFormValues = function (element)
   {
      var post_str = "";

      var children = element.childNodes;
      var glue = '';
      var i=0;

      //alert(element.tagname + ', ' + element.name);
      //alert(children.length);

      if(children.length > 0)
      {
         for (i=0; i<children.length; i++)
         {
            var ret = this.getFormValues(children[i]);

            if(ret != "")
            {
               post_str += glue + ret;
               glue = '&';
            }
         }
      }

      if(element.name != "")
      {
         if (element.tagName == "INPUT")
         {
            if (element.type == "text" || element.type == "hidden" ||
                element.type == "button" || element.type == "submit")
            {
               post_str = element.name + "=" + encodeURI(element.value);
            }

            if (element.type == "checkbox")
            {
               if (element.checked)
               {
                  post_str = element.name + "=" + element.value;
               }
               else
               {
                  post_str = element.name + "=";
               }
            }

            if (element.type == "radio")
            {
               if (element.checked)
               {
                  post_str = element.name + "=" + element.value;
               }
            }
         }

         if (element.tagName == "SELECT")
         {
            post_str = element.name + "=" + element.options[element.selectedIndex].value;
         }
      }

      return post_str;
   };


   this.ajaxResponse = function ()
   {
      try
      {
         if (this.readyState == 4)
         {
            if (this.status == 200)
            {
               var containerElement = document.createElement('body');        //najlepsi sposob, bo inac ten responseXML nema spravne typy ani innerHTML neobsahuje
               containerElement.innerHTML = this.responseText;

               for(i=0; i<containerElement.childNodes.length; i++)
               {
                  var target_id = containerElement.childNodes[i].getAttribute('id');
                  var target = document.getElementById(target_id);

                  if(target != null)
                  {
                     target.innerHTML = containerElement.childNodes[i].innerHTML;

                     var javascripts = target.getElementsByTagName("script");

                     for(var j = 0; j < javascripts.length; j++)
                     {
                        eval(javascripts[j].text);
                     }
                  }
               }
            }
         }
      }
      catch(e)
      {
      }
   };
}


/**
 * Vytvoří AJAXový objekt xmlhttprequest
 */
function ajaxCreateHttpRequest()
{
   var r = null;

   if (window.XMLHttpRequest)
   {
      r = new XMLHttpRequest();
   }
   else if (window.ActiveXObject)
   {
      try
      {
         r = new ActiveXObject("Msxml2.XMLHTTP");
      }
      catch (error)
      {
         r = new ActiveXObject("Microsoft.XMLHTTP");
      }
   }
   return r;
}

/**
 * Provede POST na zadanou url, pošle parametry. Pokud se v načtené stránce nachází objekty se stejnými id jako na této stránce, nahradí je a spusti v nich skripty
 * @param url URL adresa kam se postne
 * @param param Parametry, ktere se odeslou v POST
 */
function ajaxLoad(url,param)
{
    //Přepsáno na jQuery, kvůli problémům v IE9.
    $.post(url,param).done(function(data){
        var jd = $('<span>'+data+'</span>');
        //nahradi vsechny prvky v aktualnim dokumentu temi se stejnymi id
        jd.find("[id]").each(function(index,e){
           $("#"+$(e).attr("id")).replaceWith(e);
        });
        jd.filter("[id]").remove("script");
        //provede skripty, které jsou mimo ty s id
        jd.find("script").each(function(index,e){
           eval($(e).html());
         });
    });
}
