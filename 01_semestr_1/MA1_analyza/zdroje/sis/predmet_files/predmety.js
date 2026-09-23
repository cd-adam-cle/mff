var statniceSaveText = null;
var checkValidStatnice = function()
{
   $("#masterError.placeError").hide();
   var valid = true;
   var emptyGroups = [];

   $( "div.pouzita_skupina" ).each( function( index, element )
   {
      let selectorMinMax = "input[name^='min'], input[name^='max']";

      let itemCountPovinne = $("input[name^=\'povinna\'][type=checkbox]:checked", element).length;
      let itemCount = $("li.sortable_item", element).length;

      let itemMin   = parseInt($("input[name^=\'min\']", element).val());
      let itemMax   = parseInt($("input[name^=\'max\']", element).val());

      if (itemMin>0 && itemMax>0 && itemMin > itemMax)
      {
         $(selectorMinMax, element).addClass("inp3").addClass("inputError");
         valid = false;
      }
      else
      {
         $(selectorMinMax, element).removeClass("inp3").removeClass("inputError");
      }

      if (itemCount === 0)
      {
         emptyGroups.push(element);
      }

      let errorSelector = $(".placeError", element);

      if ($("input[name^=\'neniposledni\']:checkbox:not(:checked)", $("#form_edit")).length === 0)
      {
         $("#masterError.placeError").show().html(predmety_lang['err.statnice_vse_posledni']);
         valid = false;
      }

      if (itemMax>0 && itemCount < itemMax)
      {
          errorSelector.show().html(predmety_lang['err.statnice_chybi'].replace("%POCET%", (itemMax-itemCount))); // "Přidejte dalších "+(itemMin-itemCount)+" státnic"
          valid = false;
      }
      else if (itemMin>0 && itemCount < itemMin)
      {
         errorSelector.show().html(predmety_lang['err.statnice_chybi'].replace("%POCET%", (itemMin-itemCount))); // "Přidejte dalších "+(itemMin-itemCount)+" státnic"
         valid = false;
      }
      else if (itemMax>0 && itemCountPovinne > itemMax)
      {
         errorSelector.show().html(predmety_lang['err.statnice_prebyvaji'].replace("%POCET%", (itemCountPovinne - itemMax))); // (itemCountPovinne - itemMax)+" státnice přebývají"
         valid = false;
      }

      if (valid)
      {
         errorSelector.hide();
      }

   });


    if ($("div.nodrop li.sortable_item").length === 0)
    {
        $("div.nodrop").remove();
    }
    else
    {
       valid = false;
    }



    if (emptyGroups.length > 0)
    {
       let buf = [];

       buf.push(predmety_lang['err.statnice_prazdna_skupina']);
       for (let i in emptyGroups)
       {
           buf.push( $("input[id^=nazev_]", emptyGroups[i]).val()+" / "+$("input[id^=anazev_]", emptyGroups[i]).val());
       }
        statniceSaveText = buf.join("\n");
    }
    else
    {
        statniceSaveText = null;
    }

   if ($( "ul.nepouzite li").length > 0)
   {
      valid = false;
   }

   dl_disable(getE("btn_save"), !valid);
};




var isValidIsbn = function(str)
{
   var sum,
   weight,
   digit,
   check,
   i;

   str = str.replace(/[^0-9X]/gi, '');

   if (str.length !== 10 && str.length !== 13)
   {
      return false;
   }

   if (str.length === 13)
   {
      sum = 0;
      for (i = 0; i < 12; i++)
      {
         digit = parseInt(str[i]);
         if (i % 2 === 1)
         {
            sum += 3*digit;
         }
         else
         {
            sum += digit;
         }
      }
      check = (10 - (sum % 10)) % 10;
      return (check === str[str.length-1]);
   }

   if (str.length === 10)
   {
      weight = 10;
      sum = 0;
      for (i = 0; i < 9; i++)
      {
         digit = parseInt(str[i]);
         sum += weight*digit;
         weight--;
      }
      check = 11 - (sum % 11);
      if (check === 10)
      {
         check = 'X';
      }
      return (check === str[str.length-1].toUpperCase());
   }
}

function predmetyFormChange(querySelector, functionChange, delay = 300) {
   // Vybereme formulářové pole podle querySelector
   const field = document.querySelector(querySelector);

   if (!field) {
      console.error('Element nebyl nalezen.');
      return;
   }

   let debounceTimeout;

   // Zabalíme funkci pro zpracování změny s debouncingem, aby měla přístup k this
   const handleChange = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
         functionChange.call(field);
      }, delay);
   };

   field.addEventListener('input', handleChange);

   field.addEventListener('change', handleChange);

   // sledování změn atributu 'value', pokud změnu provede js dialog
   const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
         if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
            handleChange();
         }
      }
   });

   // Sledujeme změny atributu 'value' u formulářového pole
   observer.observe(field, { attributes: true, attributeFilter: ['value'] });
}




function literaturaCopy(skr, povinn)
{
   const fieldPovinn = document.querySelector('#povinn_zdroj').value;
   const fieldRok = document.querySelector('#skr_zdroj').value;

   if (fieldPovinn === '' || fieldRok === '')
   {
      return false;
   }
   const el = document.querySelector('#pamela_liter_ajax_nahled');
   el.style.display = 'block';
   fetch('index.php', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
         do: 'pamela_liter_ajax',
         skr_zdroj: fieldRok,
         povinn_zdroj: fieldPovinn,
         target_skr: skr,
         target_povinn: povinn,
         id: dl_id,
         tid: dl_tid,
      })
   })
       .then(response => {
          if (!response.ok) {
             throw new Error('Network response was not ok');
          }
          return response.json(); // Vrátí data jako JSON
       })
       .then(data => {
          if (data.error)
          {
             el.innerHTML = data.error;
          }
          else
          {
             el.innerHTML = '';
             if (data.preview.length > 0)
             {
                el.innerHTML += data.preview;
             }

             window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: "smooth" });
             document.querySelector('input[name="lit_kopie_confirm"]').classList.add("flash-effect");

          }
       })
       .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
       });
}

document.addEventListener('DOMContentLoaded', function () {

   document.body.addEventListener("submit", (event) => {
      if (event.target.getAttribute("id") === "xcopy_lit") {
      const checkedCount = document.querySelectorAll('input[name="pamela_id[]"]:checked').length;
      if (checkedCount === 0) {
         event.preventDefault(); // Zabrání odeslání formuláře
         document.querySelectorAll('input[name="pamela_id[]"]').forEach(el => {
            el.classList.add('flash-effect');
            setTimeout(() => {
               el.classList.remove("flash-effect");
            }, 3000);
         });
      }
   }
});

});


document.addEventListener('DOMContentLoaded', () => {
   function updateVisibility() {
      document.querySelectorAll('input[type="checkbox"][data-show-class]').forEach(checkbox => {
         const className = checkbox.getAttribute('data-show-class');
         const elements = document.querySelectorAll(`.${className}`);
         elements.forEach(el => {
            el.style.display = checkbox.checked ? '' : 'none';
         });

         if (!checkbox.dataset.listenerAttached) {
            checkbox.addEventListener('change', () => {
               elements.forEach(el => {
                  el.style.display = checkbox.checked ? '' : 'none';
               });
            });
            checkbox.dataset.listenerAttached = 'true';
         }
      });
   }

   updateVisibility();

   const observer = new MutationObserver(() => {
      updateVisibility();
   });

   observer.observe(document.body, {
   childList: true,
   subtree: true,
   });
});

