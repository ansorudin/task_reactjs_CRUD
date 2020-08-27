import React from 'react'
import Axios from 'axios'
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'




const linkApi = 'http://localhost:2000/product'

class MainMenu extends React.Component{

    state = {
        data : null,
        showForm : false,
        selecId : null

    }

    componentDidMount(){
        this.getData()
    }
    getData = () =>{
        Axios.get(linkApi)
        .then((res) => {
            // console.log(res)
            this.setState({data : res.data})
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    mapData = () =>{
        return this.state.data.map((val, index) => {
            if(this.state.selecId === val.id){
                return(
                    <div className="col-3 mt-4" key={index}>
                        <div className="border rounded border-card">
                            <div className='border rounded d-flex justify-content-center gambar-border'>
                                <img src={val.image} className='card-image-top gambar-card align-self-center' alt='gambar gagal'/>
                            </div>
                            <div className="card-body">
                                <h5><input type="text" defaultValue={val.productName} ref='namaNew' className='card-title form-control'/></h5>
                                <h6><input type="text" defaultValue={val.price} ref='priceNew' className='card-text form-control'/></h6>
                                <p><input type="text" defaultValue={val.stock} ref='stockNew' className='card-text form-control'/></p>
                                <div className="row justify-content-center"><input type="button" value="Save" onClick={this.onSaveEdit}className='btn btn-outline-warning col-10'/></div>
                                <div className="row justify-content-center"><input type="button" value="Cancel" onClick={() => this.setState({selecId : null})} className='btn btn-outline-danger mt-2 col-10'/></div>
                            </div>
                        </div>
                    </div>
    
                )
            }
            return(
                <div className="col-3 mt-4" key={index}>
                    <div className="border rounded">
                        <div className='border rounded d-flex justify-content-center gambar-border'>
                            <img src={val.image} className='card-image-top gambar-card align-self-center' alt='gambar gagal'/>
                        </div>
                        <div className="card-body">
                            <h5 className='card-title'>{val.productName}</h5>
                            <h6 className='card-text'>Rp. {val.price}</h6>
                            <p className='card-text'>Stock : {val.stock}</p>
                            <div className="row justify-content-center"><input type="button" value="Edit Data" onClick={() => this.setState({selecId : val.id})}className='btn btn-outline-secondary col-10'/></div>
                            <div className="row justify-content-center"><input type="button" value="Delete Data" className='btn btn-outline-secondary mt-2 col-10'/></div>
                        </div>
                    </div>
                </div>

            )
        })
    }
    
   onSaveEdit = () => {
    // ambil value dari inputan
    var productNameBaru = this.refs.namaNew.value
    var priceNew = this.refs.priceNew.value
    var stockNew = this.refs.stockNew.value
    // jika inputan ada semua
    if(productNameBaru && priceNew && stockNew){
        Axios.patch(linkApi + '/' + this.state.selecId, {productName : productNameBaru , price : priceNew, stock : stockNew})
        .then((res) => {
            console.log(res.data)
            if(res.status === 200){
                this.getData()
                this.setState({selecId : null})
            }
        })
        .catch((err) => {
            console.log(err)
        })       
    }else{
        alert('Tidak boleh kosong')
    }
   }


    handleModal = () =>{
        this.setState({showForm : !this.state.showForm})
    }

    saveBtnHandle = () => {
        // ambil semua inputan dari user
        var prodak = this.refs.productName.value
        var harga = this.refs.price.value
        var quantiti = this.refs.stock.value
        var gambar = this.refs.image.value
        // jika inputan ada semua
        if(prodak && harga && quantiti && gambar){
            const userExists = this.state.data.some(user => user.productName === prodak);
                if(userExists){
                alert('Nama Produk Udah Ada')
                }else{
                    Axios.post(linkApi, {productName : prodak , price : harga, stock : quantiti, image : gambar})
                    .then((res) => {
                        console.log(res.data)
                        if(res.status === 201){
                            this.handleModal()
                            this.getData()
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })       
                }
            

        }else{
            alert('Tidak boleh kosong')
        }
           
    }

   

    render(){
        if(this.state.data !== null){
            return(
                
                <div className='container border border-primary'>
                    
                    <input type="button" value="Add New Product " onClick={() => {this.handleModal()}} className='btn btn-outline-secondary mt-3'/>
                   <div className="row container-fluid">
                       {this.mapData()}
                   </div>
                   
                    <Modal size="lg" isOpen={this.state.showForm} onExit={() => this.handleModal()}>
                        <ModalHeader>Tambah Data Produk</ModalHeader>
                            <ModalBody>
                                <form className='needs-validation'>
                                    <div className="row m-3">
                                        <div className="col-12 form-group">
                                            <label>Product Name :</label>
                                            <input type="text" placeholder='Enter New Product Name' ref='productName' className='form-control'/>
                                        </div>
                                        <div className="col-12 form-group">
                                            <label>Price :</label>
                                            <input type="text" placeholder='Enter New Price' ref='price' className='form-control'/>
                                        </div>
                                        <div className="col-12 form-group">
                                            <label>Stock :</label>
                                            <input type="text" placeholder='Enter New Stock Qty' ref='stock' className='form-control'/>
                                        </div>
                                        <div className="col-12 form-group">
                                            <label>Image (URL)</label>
                                            <input type="text" placeholder='Enter Url Image' ref='image' className='form-control'/>
                                        </div>
                                    </div>
                                </form>
                            </ModalBody>
                        <ModalFooter>
                            <input type="button" value="Cancel" className='btn btn-outline-secondary' onClick={() => {this.handleModal()}}/>
                            <input type="button" value="Save" className='btn btn-outline-secondary' onClick={this.saveBtnHandle}/>

                        </ModalFooter>
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