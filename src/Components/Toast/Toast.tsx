
import { Component } from 'react';

interface ShowData {
    confirmMessage: string;
    cancelMessage: string;
    popup: boolean;
    confirmPopup: boolean;
    cancelPopup: boolean;
    condition:boolean
}

export default class Toast extends Component<{}, ShowData> {
    constructor(props: {}) {
        super(props);
        this.state = {
            confirmPopup: false,
            confirmMessage: "",
            popup: false,
            cancelPopup: false,
            cancelMessage: '',
            condition:false
        };
    }

    handleClick = () => {
        console.log("click");
        this.setState({ confirmPopup: true, cancelPopup: true });
        this.setState({popup:true})
        // this.setState({ popup: condition ? true : false });

    };

    handleConfirm = () => {
        console.log("confirm clicked");
        this.setState({ confirmMessage: "confirm clicked" })
        setTimeout(() => {
            this.setState({ confirmMessage: '' });
        }, 3000);
    };

    handleCancel = () => {
        console.log("cancel clicked");
        this.setState({ cancelMessage: "cancel clicked" })
        setTimeout(() => {

            this.setState({ cancelMessage: "" })
        }, 3000)
    };

    render() {
        return (
            <>
                <h1>Toast</h1>
                <button onClick={this.handleClick}>open</button>
                {this.state.popup && (
                    <div style={{ backgroundColor: "aqua", height: "15rem", width: "30%" }}>
                        <h1>Toast PopUp Boxes</h1>
                        <p>User Clicked</p>

                        {this.state.confirmPopup && (
                            <div> <button onClick={this.handleConfirm}>Confirm</button></div>
                        )}

                        {this.state.confirmMessage && (
                            <div style={{backgroundColor:"red" ,width:"30%" ,margin:"top"}}>{this.state.confirmMessage}</div>
                        )}
                        {this.state.cancelPopup && (
                            <button onClick={this.handleCancel}>Cancle</button>
                        )}
                        {this.state.cancelMessage && (
                            <p>{this.state.cancelMessage}</p>
                        )}
                    </div>
                )}
            </>
        );
    }
}

