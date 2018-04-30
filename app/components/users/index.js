import { h } from 'hyperapp';
import './styles.scss';

export default ({ users }) => (
     <div className={ 'Users-container callout' }>
        {
            users.map(user => (
                <button class="btn btn-sm btn-outline-primary mb-2">
                    {user.name} <span class="badge badge-pill badge-success">&nbsp;</span>
                </button>
            ))
        }
    </div>
);
