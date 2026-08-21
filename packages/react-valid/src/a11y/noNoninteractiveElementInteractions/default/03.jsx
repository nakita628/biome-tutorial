// The role="presentation" attribute removes the semantic meaning of an element, indicating that it should be ignored by assistive technologies.
// Therefore, it's acceptable to add event handlers to elements with role="presentation" for visual effects or other purposes,
// but users relying on assistive technologies may not be able to interact with these elements.
<div role="presentation" onClick={() => { }}>button</div>
