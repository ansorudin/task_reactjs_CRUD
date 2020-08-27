import React from 'react'
import Axios from 'axios'
import {Modal} from 'react-bootstrap'



var linkApi = 'http://localhost:2000/product'

class MainMenu extends React.Component{

    state = {
        data : null,
        showForm : false
    }

    componentDidMount(){
        this.getData()
    }
    getData = () =>{
        Axios.get(linkApi)
        .then((res) => {
            console.log(res)
            this.setState({data : res.data})
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    mapData = () =>{
        return this.state.data.map((val, index) => {
            return(
                <div className="col-3 mt-4" key={index}>
                    <div className="border rounded border-card">
                        <div className='border rounded d-flex justify-content-center gambar-border'>
                            <img src={val.image} className='card-image-top gambar-card align-self-center' alt='gambar gagal'/>
                        </div>
                        <div className="card-body">
                            <h5 className='card-title'>{val.productName}</h5>
                            <h6 className='card-text'>Rp. {val.price}</h6>
                            <p className='card-text'>Stock : {val.stock}</p>
                            <div className="row justify-content-center"><input type="button" value="Edit Data" className='btn btn-outline-secondary col-10'/></div>
                            <div className="row justify-content-center"><input type="button" value="Delete Data" className='btn btn-outline-secondary mt-2 col-10'/></div>
                        </div>
                    </div>
                </div>

            )
        })
    }
    
    handleModal = () =>{
        this.setState({showForm : !this.state.showForm})
    }

    saveBtnHandle = () => {
        // ambil semua inputan dari user
       
        // jika inputan ada semua
       
    }

    render(){
        if(this.state.data !== null){
            return(
                <div className='container border border-primary'>
                    <input type="button" value="Add New Product " onClick={() => {this.handleModal()}} className='btn btn-outline-secondary mt-3'/>
                   <div className="row container-fluid">
                       {this.mapData()}
                   </div>
                   
                    <Modal size="lg" show={this.state.showForm} onHide={() => this.handleModal()}>
                        <Modal.Header closeButton>Modal Head Part</Modal.Header>
                            <Modal.Body>
                                <form>
                                    <input type="text" placeholder='Enter New Product Name' className='form-control'/>
                                    <input type="text" placeholder='Enter New Price' className='form-control'/>
                                    <input type="text" placeholder='Enter New Stock Qty' className='form-control'/>
                                    <input type="text" placeholder='Enter Url Image' className='form-control'/>
                                </form>
                            </Modal.Body>
                        <Modal.Footer>
                            <input type="button" value="Cancel" className='btn btn-outline-secondary' onClick={() => {this.handleModal()}}/>
                            <input type="button" value="Save" className='btn btn-outline-secondary' onSubmit={this.saveBtnHandle}/>

                        </Modal.Footer>
                    </Modal>
                   



















                </div>
            )
        }
        return(
            <div className='container border border-primary'>
                <input type="button" value="Add New Product " className='btn btn-outline-secondary mt-3'/>
               
            </div>
        )
    }
}

export default MainMenu