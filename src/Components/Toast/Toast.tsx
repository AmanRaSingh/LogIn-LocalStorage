import React, { Component } from 'react'
interface showPopup {
    show: boolean;
    toastmessage: String;
    popup: boolean;
}

export default class Toast extends Component<{}, showPopup> {
    constructor(props: {}) {
        super(props);
        this.state = {
            show: false,
            toastmessage: '',
            popup: false,
        }
    }
    handleshowPopup = () => {
        this.setState({ popup: true })
    }
    handleconfirm = () => {
        this.setState({ show: true, popup: true, toastmessage: 'confirmed' })
        console.log('confirmed')
        setTimeout(() => {
            this.setState({ show: false })

        }, 3000);
    }
    handlecancel = () => {
        this.setState({ show: true, popup: true, toastmessage: 'cancelled' })
        console.log('cancelled')
        setTimeout(() => {
            this.setState({ show: false })

        }, 3000);
    }
    render() {
        const { show, toastmessage, popup } = this.state
        return (
            <div>
                <div className='h-[60vh] w-[50vw] bg-red-300 rounded-md'>
                    <h1 className='text-3xl text-center '>Toast Message</h1>
                    <p>Notification Message on a piece of information displayed above the page content</p>
                    <button onClick={this.handleshowPopup} className='h-[5vh] w-[7vw] rounded-md bg-green-300'>Show</button>

                    <div className='h-[20vh] w-[30vh] bg-sky-400 m-auto'>
                        {popup && (
                            <div>
                                <p>are you sure about?</p>
                                <button onClick={this.handleconfirm} className='h-[5vh] w-[7vw] ml-4 rounded-md bg-green-300'>Confirm</button>
                                <button onClick={this.handlecancel} className='h-[5vh] w-[7vw]  ml-4 rounded-md bg-green-300'>Cancel</button>

                            </div>
                        )}
                        {show && (
                            <div>
                                {toastmessage}
                            </div>
                        )}
                    </div>
                </div>
            </div>)
    }
}