import { h } from 'hyperapp';

export default ({messages}) => (
    messages.map(message => (
        <div class="alert alert-secondary" role="alert">
            { message.text }
        </div>
    ))
);
