  const $svg_icon_success = "<svg width='21px' height='16px' viewBox='0 0 21 16' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <title>Sucess</title> <desc>Success Event</desc><g id='Desktop-@1200_cintillo_exito' transform='translate(-674.000000, -339.000000)' fill='#FFFFFF'><g id='Group-6' transform='translate(664.000000, 327.000000)'> <g id='Atoms/Icons/Notication-Message/Error'> <polygon id='Page-1' points='28.8978 12.9258 18.3978 23.4258 12.8978 17.9258 10.7758 20.0468 18.3978 27.6678 31.0178 15.0468'></polygon> </g> </g> </g> </g> </svg>";
  const $svg_icon_error = "<svg width='24px' height='24px' viewBox='0 0 980 980' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> <title>Error</title><g id='error_message' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g id='error' fill='#FFFFFF' fill-rule='nonzero'><polygon id='Path' points='980 122.4 122.5 979.9 0 857.4 857.5 0'></polygon><polygon id='Path' points='857.5 980 0 122.6 122.5 0 980 857.5'></polygon></g></g></svg>";
  const $button_login = $( "#login" );
  /** 
   * Method For Validate Email
  */
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isInvalidForm = () => {
    return (!$( "#name" ).val() || !$( "#email" ).val() || !validateEmail($( "#email" ).val()));
  };

  /**
   * Method For Clear Container Messages
   */
   const clearMessageContainer = () => {
    $('#logging__alert').empty();
    $('#logging__alert').stop();;
    $("#logging__alert").removeAttr("style");
  };


  /** 
  * Method For Create message alert
  */
  function createMessageAlert($type,$message){
    clearMessageContainer();
    alert = document.createElement('div');
    alert.setAttribute("class", "alert");
    $('#logging__alert').append(alert);  

    alert_icon = document.createElement('div');
    alert_icon.setAttribute("class", "alert__icon");


    alert_response = document.createElement('div');
    alert_response.setAttribute("class", "alert__response");


    alert_close = document.createElement('button');
    alert_close.setAttribute("class", "alert__close");
    
    
   
    $('.alert').append(alert_icon);  
    $('.alert').append(alert_response);  
    $('.alert').append(alert_close);  

    $icon = ($type == 'error') ? $svg_icon_error : $svg_icon_success;
    $('.alert__icon').append($icon);
    $('.alert__icon').addClass(`alert__icon__${$type}`);

    $( ".alert__response" ).text($message);
    $('.alert__close').html("X").click(function () {
      clearMessageContainer();
    });

    $(".logging__alert").fadeOut( 20000, function() {
      clearMessageContainer();
    } )
    ;
  }


/**
 * Event for catch if the type of email is correct
 */
 $("#email").blur(function(e){
  if (!validateEmail(this.value)) {
      createMessageAlert('error','Email Invalid' );
      e.preventDefault();
      $(this).focus();
  }else{
    if (! $('#logging__alert').is(':empty')){
      if($button_login.is(e.relatedTarget)) {
        $button_login.click()
      }else{
        clearMessageContainer();
      }
    }
  }
});

/**
 * Event to send o form
 */ 
 $button_login.click(function( event ) {
  $message = "Formulario enviado con exito.";
  $type = "success";
  if(isInvalidForm()){
    $message = "Error al enviar el formulario.";
    $type = "error";
  }
  createMessageAlert($type,$message);
  event.preventDefault();
});