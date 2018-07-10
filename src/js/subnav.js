import * as oUtils from 'o-utils';

function init(headerEl) {
	const subnav = headerEl.querySelector('[data-o-header-subnav]');

	if (subnav === null) {
		return;
	}

	const buttons = Array.from(subnav.getElementsByTagName('button'));

	const wrapper = subnav.querySelector('[data-o-header-subnav-wrapper]');
	const content = subnav.querySelector('.o-header__subnav-content')

	let wrapperWidth = wrapper.clientWidth;
	let contentWidth = content.clientWidth;

	function checkCurrentPosition() {
		//get current selection
		const currentSelection = wrapper.querySelector('[aria-current]');
		if (currentSelection) {
			let currentSelectionEnd =  currentSelection.getBoundingClientRect().right;

			//if current selection is within wrapper bounds don't scroll, but show scroll options
			if (currentSelectionEnd < wrapperWidth) {
				scrollable();
			// if current selection is not within wrapper bounds, scroll to it, _then_ show scroll options
			} else {
				wrapper.scrollTo(currentSelectionEnd, 0);
				scrollable();
			}
		}
	}

	function direction(button) {
		return button.className.match(/left|right/).pop();
	}

	function scrollable() {
		let scrollWidth = wrapper.scrollWidth;

		buttons.forEach(button => {
			if (direction(button) === 'left') {
				button.disabled = wrapper.scrollLeft === 0;
			} else {
				button.disabled = true;
				const remaining = scrollWidth - wrapperWidth - wrapper.scrollLeft;
				// Allow a little difference as scrollWidth is fast, not accurate.
				button.disabled = remaining <= 1;
			}
		});
	}

	function scroll(e) {
		let distance = 100;

		if (direction(e.currentTarget) === 'left') {
			distance = (wrapper.scrollLeft > distance ? distance : wrapper.scrollLeft) * -1;
		} else {
			const remaining = scrollWidth - wrapperWidth - wrapper.scrollLeft;
			distance = remaining > distance ? distance : remaining;
		}

		wrapper.scrollLeft = wrapper.scrollLeft + distance;

		scrollable();
	}

	wrapper.addEventListener('scroll', oUtils.throttle(scrollable, 100));
	window.addEventListener('oViewport.resize', scrollable);

	buttons.forEach(button => {
		button.onclick = scroll;
	});

	//Let nav content and selection load before we decide how scrolling should behave
	setTimeout(checkCurrentPosition, 500);
}

export default { init };
