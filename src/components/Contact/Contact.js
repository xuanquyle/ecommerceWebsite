import hinh from "../../assets/images/contact-header-bg.jpg"


const Contact = () => {
    return (
        <div
        style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>
            <div className="container mt-5">
                <div className="page-header page-header-big text-center"
                    style={{ backgroundImage: `url(${hinh})` }}>
                    {/* <h1 className="page-title text-white">Liên hệ với chúng tôi<span className="text-white"></span></h1> */}
                </div>
            </div>
            <div className="page-content pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-2 mb-lg-0">
                            <h2 className="title mb-1">Thông tin liên hệ</h2>
                            <p>Bạn cần được hỗ trợ ? Hãy liên hệ với chúng tôi qua thông tin được cung cấp bên dưới. Chúng tôi luôn sẵn sàng giúp đỡ và đón nhận các góp ý của của các bạn.</p>
                            <p className="mb-3">Thân mến !</p>
                            <div className="row">
                                <div className="col-sm-7">
                                    <div className="contact-info">
                                        <h3>Cửa hàng</h3>
                                        <ul className="contact-list">
                                            <li>
                                                <i className="icon-map-marker"></i>
                                                127 D5, phường 25, quận Bình Thạnh, tp. Hồ Chí Minh
                                            </li>
                                            <li>
                                                <i className="icon-phone"></i>
                                                <a href="tel:#">+0123 456 789</a>
                                            </li>
                                            <li>
                                                <i className="icon-envelope"></i>
                                                <a href="mailto:#">molla46135@gmaij.com</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="col-sm-5">
                                    <div className="contact-info">
                                        <h3>Thời gian</h3>

                                        <ul className="contact-list">
                                            <li>
                                                <i className="icon-clock-o"></i>
                                                <span className="text-dark">7h30 - 21h00</span>
                                            </li>
                                            <li>
                                                <i className="icon-calendar"></i>
                                                <span className="text-dark">Thứ 2 - Chủ nhật</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <h2 className="title mb-1">Về Website</h2>
                            <p className="mb-2">Xây dựng theo MERN Stack</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact