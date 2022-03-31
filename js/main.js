// Слайдер секции hotel
const hotelSlider = new Swiper(".hotel-slider", {
  // Optional parameters
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: ".hotel-slider__button--next",
    prevEl: ".hotel-slider__button--prev",
  },
  effect: "coverflow",
});

// Слайдер секции reviews
const reviewsSlider = new Swiper(".reviews-slider", {
  // Optional parameters
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: ".reviews-slider__button--next",
    prevEl: ".reviews-slider__button--prev",
  },
});

// Parallax-эффект секции newsletter
$(".parallax-window").parallax({ imageSrc: "img/newsletter-bg.jpg" });

// Кнопка для мобильного окна
const menuButton = document.querySelector(".menu-button");
menuButton.addEventListener("click", function () {
  document
    .querySelector(".navbar-bottom")
    .classList.toggle("navbar-bottom--visible");
});

// Модальное окно
const Modal = () => {
  const modal = document.querySelector(".modal");
  const openButton = document.querySelector(".booking__button");
  const closeButton = document.querySelector(".modal__close");
  const overlay = document.querySelector(".modal__overlay");
  const body = document.querySelector("body");

  openButton.addEventListener("click", () => {
    modal.classList.remove("hidden");
    body.classList.add("notscroll");
  });

  overlay.addEventListener("click", () => {
    modal.classList.add("hidden");
    body.classList.remove("notscroll");
  });

  closeButton.addEventListener("click", () => {
    modal.classList.add("hidden");
    body.classList.remove("notscroll");
  });

  // Закрытие окна по нажатия на кнопку Esc
  document.body.addEventListener(
    "keyup",
    function (e) {
      var key = e.keyCode;

      if (key == 27) {
        modal.classList.add("hidden");
        body.classList.remove("notscroll");
      }
    },
    false
  );
};
Modal();

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");
  telMask(forms);
  inputsValidate(forms);
});

const inputsValidate = (forms) => {
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      formValidate(form);
    });
  });

  const formValidate = (form) => {
    const formReq = form.querySelectorAll(".required");
    formReq.forEach((input, index) => {
      formRemoveError(input);

      if (input.classList.contains("text")) {
        if (input.value === "") {
          formAddError(input);
        } 
      }

      if (input.classList.contains("tel")) {
        if (telTest(input)) {
          formAddError(input);
        } else if (input.value === "") {
          formAddError(input);
        }
      }

      if (input.classList.contains("email")) {
        // if (emailTest(input)) {
        //   formAddError(input);
        // } else
        if (input.value === "") {
          formAddError(input);
        }
      }
    });
  };

  const formAddError = (input) => {
    input.classList.add("error");
  };

  const formRemoveError = (input) => {
    input.classList.remove("error");
  };

  const emailTest = (input) => {
    //рег выражение для проверки email
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  };

  // const telTest = (input) => {
  //   ////рег выражение для проверки tel
  //   return /^\([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}/.test(input.value);
  // };
};

const telMask = (forms) => {
  forms.forEach((form) => {
    const telInputs = form.querySelectorAll(".tel");
    const telMmaskOptions = {
      mask: "+7(000)000-00-00",
    };
    telInputs.forEach((input) => {
      let mask = IMask(input, telMmaskOptions);
    });
  });
};
