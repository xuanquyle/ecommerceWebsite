import hinh from "../../assets/images/products/single/sidebar-gallery/1.jpg"

const ProductDetailsTop = () => {

    return (
        <div className="product-details-top">
            <div className="row">
                <div className="col-md-6">
                    <div className="product-gallery">
                        <figure className="product-main-image">
                            <img id="product-zoom" src={hinh} data-zoom-image="assets/images/products/single/sidebar-gallery/1-big.jpg" alt="product" />

                            <a href="/" id="btn-product-gallery" className="btn-product-gallery">
                                <i className="icon-arrows"></i>
                            </a>
                        </figure>

                        <div id="product-zoom-gallery" className="product-image-gallery">
                            <a className="product-gallery-item active" href="/" data-image="assets/images/products/single/sidebar-gallery/1.jpg" data-zoom-image="assets/images/products/single/sidebar-gallery/1-big.jpg">
                                <img src="assets/images/products/single/sidebar-gallery/1-small.jpg" alt="product side" />
                            </a>

                            <a className="product-gallery-item" href="/" data-image="assets/images/products/single/sidebar-gallery/2.jpg" data-zoom-image="assets/images/products/single/sidebar-gallery/2-big.jpg">
                                <img src="assets/images/products/single/sidebar-gallery/2-small.jpg" alt="product cross" />
                            </a>

                            <a className="product-gallery-item" href="/" data-image="assets/images/products/single/sidebar-gallery/3.jpg" data-zoom-image="assets/images/products/single/sidebar-gallery/3-big.jpg">
                                <img src="assets/images/products/single/sidebar-gallery/3-small.jpg" alt="product with model" />
                            </a>

                            <a className="product-gallery-item" href="/" data-image="assets/images/products/single/sidebar-gallery/4.jpg" data-zoom-image="assets/images/products/single/sidebar-gallery/4-big.jpg">
                                <img src="assets/images/products/single/sidebar-gallery/4-small.jpg" alt="product back" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="product-details product-details-sidebar">
                        <h1 className="product-title">Black faux leather chain trim sandals</h1>

                        <div className="ratings-container">
                            <div className="ratings">
                                <div className="ratings-val" style={{width: '80%'}}></div>
                            </div>
                            <a className="ratings-text" href="/product-review-link" id="review-link">( 2 Reviews )</a>
                        </div>

                        <div className="product-price">
                            $90.00
                        </div>

                        <div className="product-content">
                            <p>Sed egestas, ante et vulputate volutpat, eros semper est, vitae luctus metus libero eu augue.</p>
                        </div>

                        <div className="details-filter-row details-row-size">
                            <label>Color:</label>

                            <div className="product-nav product-nav-dots">
                                <a href="/" className="active" style={{background: '#333333'}}><span className="sr-only">Color name</span></a>
                                <a href="/" style={{background: '#efe7db'}}><span className="sr-only">Color name</span></a>
                            </div>
                        </div>

                        <div className="details-filter-row details-row-size">
                            <label>Size:</label>
                            <div className="select-custom">
                                <select name="size" id="size" className="form-control">
                                    <option value="/" selected="selected">Select a size</option>
                                    <option value="s">Small</option>
                                    <option value="m">Medium</option>
                                    <option value="l">Large</option>
                                    <option value="xl">Extra Large</option>
                                </select>
                            </div>

                            <a href="/" className="size-guide"><i className="icon-th-list"></i>size guide</a>
                        </div>

                        <div className="product-details-action">
                            <div className="details-action-col">
                                <label >Qty:</label>
                                <div className="product-details-quantity">
                                    <input type="number" id="qty" className="form-control" value="1" min="1" max="10" step="1" data-decimals="0" required />
                                </div>

                                <a href="/" className="btn-product btn-cart"><span>add to cart</span></a>
                            </div>

                            <div className="details-action-wrapper">
                                <a href="/" className="btn-product btn-wishlist" title="Wishlist"><span>Add to Wishlist</span></a>
                                <a href="/" className="btn-product btn-compare" title="Compare"><span>Add to Compare</span></a>
                            </div>
                        </div>

                        <div className="product-details-footer details-footer-col">
                            <div className="product-cat">
                                <span>Category:</span>
                                <a href="/">Women</a>,
                                <a href="/">Dresses</a>,
                                <a href="/">Yellow</a>
                            </div>

                            <div className="social-icons social-icons-sm">
                                <span className="social-label">Share:</span>
                                <a href="/" className="social-icon" title="Facebook" target="_blank"><i className="icon-facebook-f"></i></a>
                                <a href="/" className="social-icon" title="Twitter" target="_blank"><i className="icon-twitter"></i></a>
                                <a href="/" className="social-icon" title="Instagram" target="_blank"><i className="icon-instagram"></i></a>
                                <a href="/" className="social-icon" title="Pinterest" target="_blank"><i className="icon-pinterest"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductDetailsTop