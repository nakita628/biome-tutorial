// Adding a role to element does not add behavior.
// If not used semantic HTML elements like `button`, developers need to implement the expected behavior for role(like focusability and key press support)
// See https://www.w3.org/WAI/ARIA/apg/
<div role="button" onClick={() => { }}>button</div>
