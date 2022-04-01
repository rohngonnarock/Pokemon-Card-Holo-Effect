import "./App.scss";
import React, { useCallback } from "react";

function App() {
  let timeout;

  const mouseStart = (e) => {
    var pos = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
    e.preventDefault();
    if (e.type === "touchmove") {
      pos = [e.touches[0].clientX, e.touches[0].clientY];
    }
    var $card = e.target;
    // math for mouse position
    var l = pos[0];
    var t = pos[1];
    var h = $card.clientHeight;
    var w = $card.clientWidth;
    var px = Math.abs(Math.floor((100 / w) * l) - 100);
    var py = Math.abs(Math.floor((100 / h) * t) - 100);
    var pa = 50 - px + (50 - py);
    // math for gradient / background positions
    var lp = 50 + (px - 50) / 1.5;
    var tp = 50 + (py - 50) / 1.5;
    var px_spark = 50 + (px - 50) / 7;
    var py_spark = 50 + (py - 50) / 7;
    var p_opc = 20 + Math.abs(pa) * 1.5;
    var ty = ((tp - 50) / 2) * -1;
    var tx = ((lp - 50) / 1.5) * 0.5;
    // css to apply for active card
    var grad_pos = `background-position: ${lp}% ${tp}%;`;
    var sprk_pos = `background-position: ${px_spark}% ${py_spark}%;`;
    var opc = `opacity: ${p_opc / 100};`;
    var tf = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`;
    // need to use a <style> tag for psuedo elements
    var style = `
      .card:hover:before { ${grad_pos} }  /* gradient */
      .card:hover:after { ${sprk_pos} ${opc} }   /* sparkles */
    `;
    // set / apply css class and style
    $card.classList.add("active");
    $card.classList.remove("animated");

    const hoverStyle = document.querySelector(".hover");

    $card.setAttribute("style", tf);
    hoverStyle.innerHTML = style;

    if (e.type === "touchmove") {
      return false;
    }
    clearTimeout(timeout);
  };

  const mouseOut = (e) => {
    const hoverStyle = document.querySelector(".hover");
    var $card = e.target;
    hoverStyle.innerHTML = "";

    $card.removeAttribute("style");
    timeout = setTimeout(() => {
      $card.classList.add("animated");
    }, 2500);
  };

  const mouseStartHandler = useCallback(mouseStart, []);

  const mouseOutHandler = useCallback(mouseOut, []);

  return (
    <main id="app">
      <h1>Pokemon Card, Holo Effect</h1>

      <section className="cards">
        <div
          onMouseMove={mouseStartHandler}
          onMouseOut={mouseOutHandler}
          className="card charizard animated"
        ></div>
        <div
          onMouseMove={mouseStartHandler}
          onMouseOut={mouseOutHandler}
          className="card pika animated"
        ></div>
        <div
          onMouseMove={mouseStartHandler}
          onMouseOut={mouseOutHandler}
          className="card eevee animated"
        ></div>
        <div
          onMouseMove={mouseStartHandler}
          onMouseOut={mouseOutHandler}
          className="card mewtwo animated"
        ></div>
      </section>

      <style className="hover"></style>

      <section className="demo">
        <div
          onMouseMove={mouseStartHandler}
          onMouseOut={mouseOutHandler}
          className="card"
        ></div>
        <span className="operator">+</span>
        <div
          onMouseMove={mouseStartHandler}
          onMouseOut={mouseOutHandler}
          className="card"
        >
          <span>color-dodge</span>
        </div>
        <span className="operator">+</span>
        <div
          onMouseMove={mouseStartHandler}
          onMouseOut={mouseOutHandler}
          className="card"
        >
          <span>color-dodge</span>
        </div>
      </section>
    </main>
  );
}

export default App;
