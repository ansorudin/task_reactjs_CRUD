import React from 'react'
import Axios from 'axios'

var linkApi = 'http://localhost:2000/product'

class MainMenu extends React.Component{

    state = {
        data : null
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
                            <p className='card-text'>Stock : {val.Stock}</p>
                            <div className="row justify-content-center"><input type="button" value="Edit Data" className='btn btn-outline-secondary col-10'/></div>
                            <div className="row justify-content-center"><input type="button" value="Delete Data" className='btn btn-outline-secondary mt-2 col-10'/></div>
                        </div>
                    </div>
                </div>

            )
        })
    }

    render(){
        if(this.state.data !== null){
            return(
                <div className='container border border-primary'>
                    <input type="button" value="Add New Product " className='btn btn-outline-secondary mt-3'/>
                   <div className="row container-fluid">
                       {this.mapData()}
                   </div>
                </div>
            )
        }
        return(
            <div className='container border border-primary'>
                <input type="button" value="Add New Product " className='btn btn-outline-secondary mt-3'/>
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainMenu