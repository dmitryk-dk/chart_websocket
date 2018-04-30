import { h } from 'hyperapp';
import Users from './components/users';
import MessagePanel from './components/message_panel';
import './styles.scss';

export default (state, actions) => {
    if (!state.isAuthed) {
        return (
            <form className="form-signin" onsubmit={(e) => actions.auth(e)}>
                <h1 className="h3 mb-3 font-weight-normal">Please Enter Nickname</h1>
                <label for="inputNickName" className="sr-only">Nickname</label>
                <input 
                    type="text" 
                    className="form-control mb-3" 
                    placeholder="Nickname" 
                    required="" 
                    autofocus=""
                    onkeyup={(e) => actions.nicknameChange(e.target)}  
                />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <p className="mt-3 mb-3 text-muted">© 2017-2018</p>
            </form>
        )            
    }
    return (
        <div className={ 'container h-100 pt-2 pb-2' }>
            <div className={ 'row h-100' }>
                <div className={ 'col-sm-3' }>
                    <Users users={state.users}/>
                </div>
                <div className={ 'col-md-9' }>
                    <div className={'row h-100'}>
                        <div className={ 'col-md-12' }>
                            <MessagePanel messages={state.messages}/>
                        </div>
                        <div className={'col-md-12'}>
                            <form onsubmit={(e) => actions.send(e)}>
                                <div class="input-group mb-3">
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        placeholder="Enter mesasge" 
                                        aria-label="Enter Message" 
                                        aria-describedby="Enter message"
                                        onkeyup={(e) => actions.messageChange(e.target)} 
                                    />
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="submit">Send</button>
                                    </div>
                                </div>
                            </form>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    );
};
