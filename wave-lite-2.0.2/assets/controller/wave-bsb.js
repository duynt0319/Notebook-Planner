class StickyElement {
    constructor(selector = ".bsb-tpl-navbar-sticky", options = {}) {
      this.defaults = {
        preStuckClass: "pre-stuck",
        stuckClass: "stuck",
        stickyTarget: null,
        stickyNode: null,
        stuckClassTimeout: null,
        stuckBg: null,
        stuckTheme: null,
        scrollYDown: 250,
        scrollYUp: 25,
        bsTheme: null
      };
      this.options = { ...this.defaults, ...options };
      this.selector = selector;
      this.init();
    }
  
    init() {
      const stickyNode = document.querySelector(this.selector);
      if (stickyNode) {
        this.dataAttributes(stickyNode);
        this.options.stickyNode = stickyNode;
        if (this.options.stickyTarget) {
          const target = document.querySelector(this.options.stickyTarget);
          if (target) this.options.stickyNode = target;
        }
        window.addEventListener("scroll", this.scrollEvent.bind(this));
      }
    }
  
    dataAttributes(node) {
      this.options.stickyTarget = node.dataset.bsbStickyTarget || this.options.stickyTarget;
      this.options.stuckBg = node.dataset.bsbStuckBg || this.options.stuckBg;
      this.options.stuckTheme = node.dataset.bsbStuckTheme || this.options.stuckTheme;
      this.options.scrollYDown = Number(node.dataset.bsbScrollYDown) || this.options.scrollYDown;
      this.options.scrollYUp = Number(node.dataset.bsbScrollYUp) || this.options.scrollYUp;
      this.options.bsTheme = node.dataset.bsTheme || this.options.bsTheme;
    }
  
    scrollEvent() {
      const scrollY = window.scrollY;
      const { scrollYDown, scrollYUp, preStuckClass, stuckClass } = this.options;
      if (scrollY >= scrollYDown) {
        const { stickyNode, stuckBg, stuckTheme } = this.options;
        if (!stickyNode.classList.contains(preStuckClass)) {
          stickyNode.classList.add(preStuckClass);
          this.options.stuckClassTimeout = setTimeout(() => {
            stickyNode.classList.add(stuckClass);
            if (stuckBg) document.querySelector(this.selector).classList.add(stuckBg);
            if (stuckTheme) stickyNode.setAttribute("data-bs-theme", stuckTheme);
          }, 250);
        }
        if (stickyNode.classList.contains(stuckClass)) clearTimeout(this.options.stuckClassTimeout);
      }
      if (scrollY <= scrollYUp) {
        const { stickyNode, bsTheme } = this.options;
        if (stickyNode.classList.contains(preStuckClass) || stickyNode.classList.contains(stuckClass)) {
          stickyNode.classList.remove(preStuckClass);
          stickyNode.classList.remove(stuckClass);
          if (this.options.stuckBg) document.querySelector(this.selector).classList.remove(this.options.stuckBg);
          if (bsTheme) stickyNode.setAttribute("data-bs-theme", bsTheme);
        }
      }
    }
  }
  
  (function() {
    function initializeStickyElements() {
      new StickyElement();
    }
  
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initializeStickyElements);
    } else {
      initializeStickyElements();
    }
  })();
  