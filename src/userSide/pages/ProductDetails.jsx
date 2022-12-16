import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Spinner, Progress } from "reactstrap";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addProductToCartApi, cartActions } from "../../redux/slices/cartSlice";

import products from "../../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import ProductsList from "../components/UI/ProductsList";

import "../styles/product-details.css";
import { toast } from "react-toastify";
import { getDetailService } from "../../services/productService";
import {
  getProductDetailFeedBackService,
  postFeedBackService,
} from "../../services/feedBackServices";
import {
  addProductToCartService,
  getAllCartItemService,
} from "../../services/cartServices";

const RATINGS = [1, 2, 3, 4, 5];
const ProductDetails = () => {
  const accessToken = JSON.parse(localStorage.getItem("token"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const dispatch = useDispatch();
  const [productDetail, setProductDetail] = useState({});
  const [countAddCart, setCountAddCart] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchDetailProductApi = async () => {
      setLoading(true);
      const responeProduct = await getDetailService(id);
      const responeFeedBack = await getProductDetailFeedBackService(id);
      const productDetail = {
        name: responeProduct.data.name,
        image: responeProduct.data.image,
        price: responeProduct.data.price,
        description: responeProduct.data.description,
        category: responeProduct.data.Category.category_name,
        feedBack: responeFeedBack.data,
      };
      console.log(productDetail);
      await setProductDetail(productDetail);
      setLoading(false);
    };
    fetchDetailProductApi();
  }, []);
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(0);

  const reviewMsg = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();
    const reivewUserMsg = reviewMsg.current.value;
    const dataFeedBack = {
      id: id,
      comment: reivewUserMsg,
      rating,
      accessToken,
    };

    const fetchFeedBackApi = async () => {
      const respone = await postFeedBackService(dataFeedBack);
      const responeFeedBack = await getProductDetailFeedBackService(id);
      let cloneProductDetail = { ...productDetail };
      cloneProductDetail = {
        ...cloneProductDetail,
        feedBack: responeFeedBack.data,
      };
      setProductDetail(cloneProductDetail);
      toast.success("Review submitted");
    };

    if (currentUser !== null) {
      fetchFeedBackApi();
      reviewMsg.current.value = "";
    } else {
      toast.error("You must login before comment");
    }
  };

  const addToCart = () => {
    const dataCart = {
      id,
      price: productDetail.price,
      quantity: countAddCart,
      accessToken,
    };
    console.log(dataCart);
    const fetchAddProductToCartApi = async () => {
      setLoadingCart(true);
      await dispatch(addProductToCartApi(dataCart));
      setLoadingCart(false);
      toast.success(`${productDetail.name} added successfully`);
    };
    if (currentUser !== null) {
      fetchAddProductToCartApi();
    } else {
      toast.error("You must login before add product to cart");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productDetail]);

  return (
    <Helmet title={productDetail.name}>
      {loadingCart ? (
        <Progress animated value="100" className="progress"></Progress>
      ) : (
        ""
      )}
      <CommonSection title={productDetail.name} />
      {loading === true ? (
        <div className="loading--api">
          <Spinner animation="grow" variant="success" />
        </div>
      ) : (
        <>
          <section>
            <Container>
              <Row>
                <Col lg="6">
                  <img src={productDetail.image} alt="" />
                </Col>
                <Col>
                  <div className="product__details">
                    <h2>{productDetail.name}</h2>
                    <div className="product__rating d-flex align-items-center gap-5 mb-3">
                      <div>
                        <span>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span>
                          <i className="ri-star-s-fill"></i>
                        </span>
                        <span>
                          <i className="ri-star-half-s-line"></i>
                        </span>
                      </div>
                      <p>
                        (<span>{4.7}</span> ratings)
                      </p>
                    </div>
                    <div className="d-flex align-items-center gap-5">
                      <span className="product__price">
                        {productDetail.price} VND
                      </span>
                      <span>
                        Category:{" "}
                        {productDetail.category
                          ? productDetail.category.toUpperCase()
                          : ""}
                      </span>
                    </div>
                    <p className="mt-3">{productDetail.description}</p>
                    <div className="btn--group__addCart">
                      <button
                        className="btn--sub__addCart"
                        onClick={() => {
                          let count = countAddCart === 1 ? 1 : countAddCart - 1;
                          setCountAddCart(count);
                        }}
                      >
                        <i className="ri-subtract-fill"></i>
                      </button>

                      <div className="btn--sub__count">
                        <p>{countAddCart}</p>
                      </div>
                      <button
                        className="btn--sub__addCart"
                        onClick={() => setCountAddCart(countAddCart + 1)}
                      >
                        <i className="ri-add-fill"></i>
                      </button>
                    </div>
                    <motion.button
                      whileTap={{ scale: 1.2 }}
                      className="buy__btn btn__addCart"
                      onClick={addToCart}
                    >
                      Add to cart
                    </motion.button>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section>
            <Container>
              <Row>
                <Col lg="12">
                  <div className="tab__wrapper d-flex align-items-center gap-5">
                    <h6
                      className={`${tab === "desc" ? "active__tab" : ""}`}
                      onClick={() => setTab("desc")}
                    >
                      Description
                    </h6>
                    <h6
                      className={`${tab === "rev" ? "active__tab" : ""}`}
                      onClick={() => setTab("rev")}
                    >
                      Reviews (
                      {productDetail.feedBack
                        ? productDetail.feedBack.length
                        : ""}
                      )
                    </h6>
                  </div>
                  {tab === "desc" ? (
                    <div className="tab__content mt-5">
                      <p>{productDetail.description}</p>
                    </div>
                  ) : (
                    <div className="product__review mt-5">
                      <div className="review__wrapper">
                        <ul>
                          {productDetail.feedBack.map((item, index) => {
                            return (
                              <li key={index}>
                                <div className="user__comment__block">
                                  <div>
                                    <img
                                      className="avatarUser__comment"
                                      src={item.avatar}
                                      alt="#"
                                    />
                                  </div>
                                  <div>
                                    <h6>{item.user_name}</h6>

                                    <span>{item.rating} (average rating)</span>
                                  </div>
                                </div>

                                <p>{item.comment_text}</p>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="review__form">
                          <h4>Leave your experience</h4>
                          <form action="" onSubmit={submitHandler}>
                            <div className="form__rating d-flex align-items-center gap-3">
                              {RATINGS.map((item, key) => {
                                return (
                                  <motion.span
                                    whileTap={{ scale: 1.2 }}
                                    onClick={() => setRating(item)}
                                  >
                                    {item} <i className="ri-star-s-fill"></i>
                                  </motion.span>
                                );
                              })}
                            </div>
                            <div className="form__group">
                              <textarea
                                rows={4}
                                type="text"
                                placeholder="Review Meassage ..."
                                ref={reviewMsg}
                                required
                              />
                            </div>
                            <motion.button
                              whileTap={{ scale: 1.2 }}
                              type="submit"
                              className="buy__btn"
                            >
                              Submit
                            </motion.button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </Col>
                <Col lg="12" className="mt-5">
                  <h2 className="related__title">You might also like</h2>
                </Col>
                {/* <ProductsList data={relatedProducts} /> */}
              </Row>
            </Container>
          </section>
        </>
      )}
    </Helmet>
  );
};

export default ProductDetails;
