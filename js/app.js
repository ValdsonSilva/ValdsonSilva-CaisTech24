
var caistech = {};

function toggleFAQ(index) {
    var faqs = document.getElementsByClassName("faq-item");
    for (let i = 0; i < faqs.length; i++) {
        var content = faqs[i].getElementsByClassName("faq-content")[0];
        var sign = faqs[i].getElementsByClassName("toggle-sign")[0];
        if (i === index) {
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                sign.textContent = '+';
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                sign.textContent = '-';
            }
        } else {
            content.style.maxHeight = null;
            sign.textContent = '+';
        }
    }
}

function OpenTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
  

caistech.metodos = {

    // mensagens
    mensagem: (texto, cor = 'red', tempo = 3500) => {

        let id = Math.floor(Date.now() * Math.random()).toString();

        let msg = `<div id="msg-${id}" class="animated fadeInDown toast ${cor}">${texto}</div>`;

        $("#container-mensagens").append(msg);

        setTimeout(() => {
            $("#msg-" + id).removeClass('fadeInDown');
            $("#msg-" + id).addClass('fadeOutUp');
            setTimeout(() => {
                $("#msg-" + id).remove();
            }, 800);
        }, tempo)

    }

}

function gerarImagem() {
    // Obtenha o valor do campo de entrada
    const promptValue = document.getElementById('promptInput').value;
  
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-Prodia-Key': '4b35363f-a524-418b-8b2c-ee141e642a8b'
      },
      body: JSON.stringify({
        style_preset: '3d-model',
        upscale: true,
        prompt: promptValue,
        steps: 20,
        cfg_scale: 7,
        seed: -1,
        sampler: 'DPM++ 2M Karras',
        width: 512,
        height: 512,
        negative_prompt: 'badly drawn',
        model: 'v1-5-pruned-emaonly.safetensors [d7049739]'
      })
    };
  
    fetch('https://api.prodia.com/v1', options)
      .then(response => response.json())
      .then(response => {
        // Obtenha a URL da imagem gerada a partir da resposta da API
        const imageUrl = response.data.url;
  
        // Atualize a propriedade src da imagem no HTML
        document.getElementById('generatedImage').src = imageUrl;
      })
      .catch(err => console.error(err));
}
  
 

// ------------deixando o site com um smooth scroll----------------------

document.addEventListener("DOMContentLoaded", function() {
  // Seleciona todos os links âncora dentro do menu de navegação
  const links = document.querySelectorAll('.navbar-nav a[href^="#"]');
  console.log("Elementos: ", links)

  // Adiciona um evento de clique a cada link âncora
  links.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault(); // Previne o comportamento padrão do link

          const targetId = this.getAttribute('href'); // Obtém o ID da seção alvo
          const targetElement = document.querySelector(targetId); // Seleciona o elemento alvo

          // Verifica se o elemento alvo existe
          if (targetElement) {
              // Calcula a posição do elemento alvo em relação ao topo da página
              const offsetTop = targetElement.getBoundingClientRect().top + window.scrollX;

              // Rola suavemente até a posição do elemento alvo
              // window.scrollTo({
              //     top: offsetTop,
              //     behavior: 'smooth'
              // });

              smoothScrollTo(0, offsetTop);
          }
      });
  });

  function smoothScrollTo(endX, endY, duration) {
    const startX = window.scrollX
    const startY = window.scrollY
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== 'undefined' ? duration : 900;

    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
        if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
        return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };

  const timer = setInterval(() => {
      const time = new Date().getTime() - startTime;
      const newX = easeInOutQuart(time, startX, distanceX, duration);
      const newY = easeInOutQuart(time, startY, distanceY, duration);
      if (time >= duration) {
          clearInterval(timer);
      }
      window.scroll(newX, newY);
  }, 1000 / 100); // 60 fps
};
});