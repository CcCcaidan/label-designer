// Angular Elements bridge for Label Designer
import { Component, Injector } from '@angular/core'
import { createCustomElement } from '@angular/elements'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { LabelDesignerModule, LabelDesignerComponent } from 'label-designer'

@NgModule({
  imports: [
    BrowserModule,
    LabelDesignerModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    // Create the custom element
    const labelDesignerElement = createCustomElement(LabelDesignerComponent, {
      injector: this.injector
    })

    // Register the custom element with the browser.
    if (!customElements.get('angular-label-designer')) {
      customElements.define('angular-label-designer', labelDesignerElement)
    }
  }
}

export function bootstrapAngularElements() {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err))
}