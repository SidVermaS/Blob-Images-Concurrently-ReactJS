
import useDummy from './useDummy.ts'
import "./index.module.css"
const Dummy = () => {
    const { images } = useDummy()
    return <div className="background"> <div> {(images.map((dummyItem, index) => (<img key={index} src={`${dummyItem.data}`} />)))} </div>
    </div>
}
export default Dummy