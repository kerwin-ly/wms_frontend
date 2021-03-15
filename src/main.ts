import { enableProdMode, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
  console.warn(`Version: ${environment.version}`);
  console.warn(`Tag: ${environment.tag}`);
}

const bootstrap = () => {
  return platformBrowserDynamic().bootstrapModule(AppModule, {
    defaultEncapsulation: ViewEncapsulation.Emulated
  });
};

bootstrap().then(() => {
  setTimeout(() => {
    const body = document.querySelector('body');
    const preloader = document.querySelector('.preloader');
    body.style.overflow = 'hidden';
    if (!preloader) { return; }
    preloader.addEventListener('transitionend', () => {
      preloader.className = 'preloader-hidden';
    });
    preloader.className += ' preloader-hidden-add preloader-hidden-add-active';
    body.style.overflow = '';
  }, 100);
});
