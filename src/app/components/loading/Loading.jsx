import loadingGif from '../../assets/images/star-wars-loading.gif';
export default function Loading() {

    return (
        <div className='loading' id='loading'>
            <img src={loadingGif}></img>
        </div>
    )
   
}