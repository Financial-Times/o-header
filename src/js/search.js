class Search {
	constructor(headerEl) {
		this.headerEl = headerEl;
		if (!this.headerEl) {
			return;
		}

		this.formEl = this.headerEl.querySelector('[data-o-header-search]');
		if (!this.formEl) {
			return;
		}

		this.toggleEl = this.headerEl.querySelector('[data-o-header-togglable-search]');
		this.menuToggleEl = this.headerEl.querySelector('[data-o-header-togglable-nav]');
		this.searchButtonEl = this.headerEl.querySelector('.o-header__search-button');

		if (this.toggleEl) {
			this.inputEl = this.formEl.querySelector('input');
			this.toggleHandler = this.searchToggleClickHandler.bind(this);
			this.toggleEl.addEventListener('touchend', this.toggleHandler);
			this.toggleEl.addEventListener('click', this.toggleHandler);

			this.unfocusHander = this.searchUnFocusHandler.bind(this);
			this.searchButtonEl.addEventListener('blur', this.unfocusHander);

			this.removeTabindexOnBlur = this.toggleUnFocusHandler.bind(this);
		}
	}

	searchUnFocusHandler() {
		this.toggleEl.focus();
		this.toggleEl.addEventListener('blur', this.removeTabindexOnBlur);
		this.searchButtonEl.removeEventListener('blur', this.unfocusHander);
	}

	toggleUnFocusHandler() {
		this.menuToggleEl.focus();
		this.toggleEl.removeEventListener('blur', this.removeTabindexOnBlur);
	}

	searchToggleClickHandler() {
		const isOpen = getComputedStyle(this.formEl).getPropertyValue('visibility') === 'visible';

		if (isOpen) {
			this.inputEl.focus();
		}

		this.headerEl.dispatchEvent(new CustomEvent('oHeader.searchToggle', {
			bubbles: true,
			detail: {
				isOpen: isOpen
			}
		}));
	}

	destroy() {
		if (this.toggleEl) {
			this.toggleEl.removeEventListener('touchend', this.toggleHandler);
			this.toggleEl.removeEventListener('click', this.toggleHandler);
			delete this.toggleEl;
			delete this.inputEl;
			delete this.toggleHandler;
		}
		delete this.headerEl;
		delete this.formEl;
		delete this.searchButtonEl;
		delete this.menuToggleEl;
	}
}

export default Search;
