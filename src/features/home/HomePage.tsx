import { QRCode, Carousel } from 'antd'
import { observer } from 'mobx-react-lite'

import styles from './HomePage.module.scss'

export default observer(function HomePage() {
    return (
        // <div className="masthead">
        //   <QRCode
        //     errorLevel="H"
        //     value="https://karen-food.ir/restaurant/2f09ee07-e0e4-4672-2237-08daeb80240d/1"
        //     icon="https://karen-food.ir/attachments/iisos0w2.lxh/logo.png"
        //   />
        // </div>
        <>
            <div className="header-container">
              <div className={`menu-link ${styles.a}`}>بریم برای یه چیز خوشمزه</div>
                <Carousel>
                    <img src="/assets/images/1.jpg" alt="" />
                    <img src="/assets/images/2.jpg" alt="" />
                    <img src="/assets/images/3.jpg" alt="" />
                </Carousel>
            </div>
        </>
    )
})
