import { LitElement, html } from 'lit-element'
// import AutocompleteCore from '../autocomplete/dist/autocomplete.esm.js'
// import uniqueId from '../autocomplete/util/uniqueId.js'

class Autocomplete extends LitElement {
  static get properties() {
    return {
      search: { type: Function },
      autoSelect: { type: Boolean },
      defaultValue: { type: String },
      results: { type: Array },
    }
  }

  constructor() {
    super()
    // Default prop values
    this.autoSelect = false
    // this.getResultValue = result => {
    //   console.log('getResultValue', result)
    //   return result
    // }
    this.defaultValue = ''

    // Internal data
    this.value = ''
    // this.resultListId = uniqueId('autocomplete-result-list-')
    this.resultListId = 'autocomplete-result-list-1'
    this.results = []
    this.selectedIndex = -1
    this.expanded = false
    this.loading = false
    this.position = 'below'
    this.resetPosition = true
    // this.core = new AutocompleteCore({
    //   search: this.search,
    //   autoSelect: this.autoSelect,
    //   setValue: this.setValue,
    //   onUpdate: this.handleUpdate,
    //   onSubmit: this.handleSubmit,
    //   onShow: this.handleShow,
    //   onHide: this.handleHide,
    //   onLoading: this.handleLoading,
    //   onLoaded: this.handleLoaded,
    // })
    this.core = {
      handleInput(event) {
        console.log('core.handleInput', event.target.value)
      },
      handleKeyDown(event) {
        console.log('core.handleKeyDown')
      },
      handleFocus() {
        console.log('core.handleFocus')
      },
      handleBlur() {
        console.log('core.handleBlur')
      },
      handleResultMouseDown() {
        console.log('core.handleResultMouseDown')
      },
      handleResultClick() {
        console.log('core.handleResultClick')
      },
    }
  }

  setValue(result) {
    this.value = result ? this.getResultValue(result) : ''
  }

  handleUpdate(results, selectedIndex) {
    this.results = results
    this.selectedIndex = selectedIndex
  }

  handleSubmit(selectedResult) {
    console.log('submit', selectedResult)
  }

  handleShow() {
    this.expanded = true
  }

  handleHide() {
    this.expanded = false
  }

  handleLoading() {
    this.loading = true
  }

  handleLoaded() {
    this.loading = false
  }

  handleInput(event) {
    const value = event.target.value
    this.value = value
    this.results = [`${value}-1`, `${value}-2`, `${value}-3`]
    console.log('results:', this.results)
    this.core.handleInput(event)
  }

  getResultValue(result) {
    console.log('getResultValue', result)
    return result
  }

  render() {
    return html`
      <div class="autocomplete">
        <input
          class="autocomplete-input"
          .value="${this.value}"
          role="combobox"
          autocomplete="disable-autocomplete"
          autocapitalize="off"
          autocorrect="off"
          spellcheck="false"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-owns="${this.resultListId}"
          aria-expanded="${this.expanded ? 'true' : 'false'}"
          @input="${this.handleInput}"
          @keydown="${this.core.handleKeyDown}"
          @focus="${this.core.handleFocus}"
          @blur="${this.core.handleBlur}"
        />
        <ul
          id="${this.resultListId}"
          class="autocomplete-result-list"
          role="listbox"
          @mousedown="${this.core.handleResultMouseDown}"
          @click="${this.core.handleResultClick}"
        >
          ${this.results.map(
            (result, index) => html`
              <li
                id="autocomplete-result-${index}"
                class="autocomplete-result"
                data-result-index="${index}"
                role="option"
                ?aria-selected="${this.selectedIndex === index}"
              >
                ${this.getResultValue(result)}
              </li>
            `
          )}
        </ul>
      </div>
    `
  }
}

customElements.define('slate-autocomplete', Autocomplete)
