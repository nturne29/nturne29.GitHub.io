class DynamicLoader {
    constructor() {
      this.contentContainer = document.getElementById('dynamic-content');
      this.init();
    }
  
    async loadPage(url) {
      this.contentContainer.innerHTML = '<div class="loader"></div>';
  
      try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const newContent = doc.querySelector('main').innerHTML;
        
        this.contentContainer.innerHTML = newContent;
        this.contentContainer.classList.add('fade-in');
        
        this.loadPageScript(url);
      } catch (error) {
        console.error('Failed to load page:', error);
      }
    }
  
    loadPageScript(url) {
      const pageName = url.split('/').pop().replace('.html', '');
      const scriptPath = `js/components/${pageName}.js`;
      
      const oldScript = document.querySelector(`script[data-page="${pageName}"]`);
      if (oldScript) oldScript.remove();
  
      const script = document.createElement('script');
      script.src = scriptPath;
      script.dataset.page = pageName;
      document.body.appendChild(script);
    }
  }
  
  const pageLoader = new DynamicLoader();