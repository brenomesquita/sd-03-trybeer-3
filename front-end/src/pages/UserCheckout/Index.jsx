import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createSale, saveSaleProducts } from '../../services/trybeerUserAPI';
import TopMenu from '../../components/TopMenu/Index';
import './styles.css';

// code on: https://blog.mxcursos.com/10-modelos-de-checkouts-em-html-e-css-gratuitos/
const cardInput = () => (
  <div id="payment" className="payment">
    <div className="card">
      <div className="card-content">
        <svg id="logo-visa" enableBackground="new 0 0 50 70" height="70px" version="1.1" viewBox="0 0 50 50" width="70px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
          <g>
            <g>
              <polygon clipRule="evenodd" fill="#f4f5f9" fillRule="evenodd" points="17.197,32.598 19.711,17.592 23.733,17.592     21.214,32.598   " />
              <path clipRule="evenodd" d="M35.768,17.967c-0.797-0.287-2.053-0.621-3.596-0.621    c-3.977,0-6.752,2.029-6.776,4.945c-0.023,2.154,1.987,3.358,3.507,4.08c1.568,0.738,2.096,1.201,2.076,1.861    c0,1.018-1.238,1.471-2.395,1.471c-1.604,0-2.455-0.232-3.773-0.787l-0.53-0.248l-0.547,3.348    c0.929,0.441,2.659,0.789,4.462,0.811c4.217,0,6.943-2.012,6.979-5.135c0.025-1.692-1.053-2.999-3.369-4.071    c-1.393-0.685-2.246-1.134-2.246-1.844c0-0.645,0.723-1.306,2.295-1.306c1.314-0.024,2.268,0.271,3.002,0.58l0.365,0.167    L35.768,17.967z" fill="#f4f5f9" fillRule="evenodd" />
              <path clipRule="evenodd" d="M46.055,17.616h-3.102c-0.955,0-1.688,0.272-2.117,1.24    l-5.941,13.767h4.201c0,0,0.688-1.869,0.852-2.262c0.469,0,4.547,0,5.133,0c0.123,0.518,0.49,2.262,0.49,2.262h3.711    L46.055,17.616 M41.1,27.277c0.328-0.842,1.609-4.175,1.609-4.175c-0.041,0.043,0.328-0.871,0.529-1.43l0.256,1.281    c0,0,0.773,3.582,0.938,4.324H41.1z" fill="#f4f5f9" fillRule="evenodd" />
              <path clipRule="evenodd" d="M13.843,17.616L9.905,27.842l-0.404-2.076    c-0.948-2.467-2.836-4.634-5.53-6.163l3.564,12.995h4.243l6.312-14.982H13.843z" fill="#f4f5f9" fillRule="evenodd" />
              <path clipRule="evenodd" d="M7.232,17.174H0.755l-0.037,0.333    c5.014,1.242,8.358,4.237,9.742,7.841l-1.42-6.884C8.798,17.507,8.105,17.223,7.232,17.174L7.232,17.174z" fill="#f4f5f9" fillRule="evenodd" />
            </g>
          </g>
        </svg>
        <h5>Card Number</h5>
        <h6 id="label-cardnumber">0000 0000 0000 0000</h6>
        <h5>
          Expiration
          <span>CVC</span>
        </h5>
        <h6 id="label-cardexpiration">
          00 / 0000
          <span>000</span>
        </h6>
      </div>
      <div className="wave" />
    </div>
    <div className="card-form">
      <p className="field">
        <svg id="i-cardfront" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve" width="28px" height="28px">
          <g>
            <path d="M471.5,88h-432C17.72,88,0,105.72,0,127.5v256C0,405.28,17.72,423,39.5,423h432c21.78,0,39.5-17.72,39.5-39.5v-256   C511,105.72,493.28,88,471.5,88z M496,383.5c0,13.509-10.991,24.5-24.5,24.5h-432C25.991,408,15,397.009,15,383.5v-256   c0-13.509,10.991-24.5,24.5-24.5h432c13.509,0,24.5,10.991,24.5,24.5V383.5z" fill="#dddfe6" />
            <path d="M239.5,352h-176c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h176c4.142,0,7.5-3.358,7.5-7.5S243.642,352,239.5,352z" fill="#dddfe6" />
            <path d="M343.5,352h-72c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h72c4.142,0,7.5-3.358,7.5-7.5S347.642,352,343.5,352z" fill="#dddfe6" />
            <path d="M79.5,239h48c12.958,0,23.5-10.542,23.5-23.5v-32c0-12.958-10.542-23.5-23.5-23.5h-48C66.542,160,56,170.542,56,183.5v32   C56,228.458,66.542,239,79.5,239z M136,183.5v8.5h-8.5c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h8.5v8.5   c0,4.687-3.813,8.5-8.5,8.5H111v-49h16.5C132.187,175,136,178.813,136,183.5z M79.5,175H96v49H79.5c-4.687,0-8.5-3.813-8.5-8.5V207   h8.5c4.142,0,7.5-3.358,7.5-7.5s-3.358-7.5-7.5-7.5H71v-8.5C71,178.813,74.813,175,79.5,175z" fill="#dddfe6" />
            <path d="M63.5,319c4.142,0,7.5-3.358,7.5-7.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16C56,315.642,59.358,319,63.5,319   z" fill="#dddfe6" />
            <path d="M80,295.5v16c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-16c0-4.142-3.358-7.5-7.5-7.5S80,291.358,80,295.5z" fill="#dddfe6" />
            <path d="M104,295.5v16c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-16c0-4.142-3.358-7.5-7.5-7.5S104,291.358,104,295.5z" fill="#dddfe6" />
            <path d="M128,295.5v16c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-16c0-4.142-3.358-7.5-7.5-7.5S128,291.358,128,295.5z" fill="#dddfe6" />
            <path d="M167.5,319c4.142,0,7.5-3.358,7.5-7.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16   C160,315.642,163.358,319,167.5,319z" fill="#dddfe6" />
            <path d="M191.5,319c4.142,0,7.5-3.358,7.5-7.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16   C184,315.642,187.358,319,191.5,319z" fill="#dddfe6" />
            <path d="M215.5,319c4.142,0,7.5-3.358,7.5-7.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16   C208,315.642,211.358,319,215.5,319z" fill="#dddfe6" />
            <path d="M239.5,288c-4.142,0-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-16   C247,291.358,243.642,288,239.5,288z" fill="#dddfe6" />
            <path d="M271.5,319c4.142,0,7.5-3.358,7.5-7.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16   C264,315.642,267.358,319,271.5,319z" fill="#dddfe6" />
            <path d="M295.5,319c4.142,0,7.5-3.358,7.5-7.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16   C288,315.642,291.358,319,295.5,319z" fill="#dddfe6" />
            <path d="M319.5,319c4.142,0,7.5-3.358,7.5-7.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16   C312,315.642,315.358,319,319.5,319z" fill="#dddfe6" />
            <path d="M343.5,288c-4.142,0-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-16   C351,291.358,347.642,288,343.5,288z" fill="#dddfe6" />
            <path d="M375.5,288c-4.142,0-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-16   C383,291.358,379.642,288,375.5,288z" fill="#dddfe6" />
            <path d="M399.5,288c-4.142,0-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-16   C407,291.358,403.642,288,399.5,288z" fill="#dddfe6" />
            <path d="M423.5,288c-4.142,0-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-16   C431,291.358,427.642,288,423.5,288z" fill="#dddfe6" />
            <path d="M447.5,288c-4.142,0-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-16   C455,291.358,451.642,288,447.5,288z" fill="#dddfe6" />
            <path d="M415.5,160h-48c-21.78,0-39.5,17.72-39.5,39.5s17.72,39.5,39.5,39.5h48c21.78,0,39.5-17.72,39.5-39.5S437.28,160,415.5,160   z M415.5,224h-48c-13.509,0-24.5-10.991-24.5-24.5s10.991-24.5,24.5-24.5h48c13.509,0,24.5,10.991,24.5,24.5S429.009,224,415.5,224   z" fill="#dddfe6" />
          </g>
        </svg>
        <input type="text" id="cardnumber" className="inputText" name="cardnumber" placeholder="1234 5678 9123 4567" pattern="\d*" title="Card Number" />
      </p>
      <p className="field space">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="i-calendar" x="0px" y="0px" viewBox="0 0 191.259 191.259" xmlSpace="preserve" width="28px" height="28px">
          <g>
            <circle cx="59.768" cy="83.634" r="3.985" fill="#dddfe6" />
            <circle cx="83.676" cy="83.634" r="3.985" fill="#dddfe6" />
            <circle cx="107.583" cy="83.634" r="3.985" fill="#dddfe6" />
            <circle cx="35.861" cy="107.541" r="3.984" fill="#dddfe6" />
            <circle cx="59.768" cy="107.541" r="3.984" fill="#dddfe6" />
            <circle cx="83.676" cy="107.541" r="3.984" fill="#dddfe6" />
            <circle cx="107.583" cy="107.541" r="3.984" fill="#dddfe6" />
            <circle cx="155.398" cy="107.541" r="3.984" fill="#dddfe6" />
            <circle cx="131.49" cy="83.634" r="3.985" fill="#dddfe6" />
            <circle cx="155.398" cy="83.634" r="3.985" fill="#dddfe6" />
            <circle cx="35.861" cy="131.449" r="3.985" fill="#dddfe6" />
            <circle cx="59.768" cy="131.449" r="3.985" fill="#dddfe6" />
            <circle cx="83.676" cy="131.449" r="3.985" fill="#dddfe6" />
            <circle cx="107.583" cy="131.449" r="3.985" fill="#dddfe6" />
            <circle cx="131.49" cy="131.449" r="3.985" fill="#dddfe6" />
            <circle cx="155.398" cy="131.449" r="3.985" fill="#dddfe6" />
            <circle cx="35.861" cy="155.356" r="3.985" fill="#dddfe6" />
            <circle cx="59.768" cy="155.356" r="3.985" fill="#dddfe6" />
            <circle cx="83.676" cy="155.356" r="3.985" fill="#dddfe6" />
            <circle cx="107.583" cy="155.356" r="3.985" fill="#dddfe6" />
            <path d="M131.49,119.495c6.603,0,11.954-5.351,11.954-11.954s-5.351-11.954-11.954-11.954   c-6.603,0-11.954,5.351-11.954,11.954S124.887,119.495,131.49,119.495z M131.49,103.557c2.199,0,3.985,1.786,3.985,3.984   s-1.786,3.984-3.985,3.984s-3.984-1.786-3.984-3.984S129.292,103.557,131.49,103.557z" fill="#dddfe6" />
            <path d="M175.321,15.98h-7.969v-3.985c0-6.601-5.354-11.954-11.954-11.954   c-6.603,0-11.954,5.352-11.954,11.954v3.985h-95.63v-3.985c0-6.601-5.354-11.954-11.954-11.954   c-6.603,0-11.954,5.352-11.954,11.954v3.985h-7.969C7.136,15.98,0,23.116,0,31.918v15.854v7.969v119.537   c0,8.802,7.136,15.938,15.938,15.938h159.382c8.802,0,15.938-7.136,15.938-15.938V55.742v-7.969V31.918   C191.259,23.116,184.123,15.98,175.321,15.98z M151.413,23.949V15.98v-3.985c0-2.201,1.782-3.985,3.985-3.985   c2.198,0,3.984,1.784,3.984,3.985v3.985v7.969v3.984c0,2.2-1.786,3.985-3.984,3.985c-2.202,0-3.985-1.784-3.985-3.985V23.949z    M31.876,23.949V15.98v-3.985c0-2.201,1.782-3.985,3.985-3.985c2.199,0,3.985,1.784,3.985,3.985v3.985v7.969v3.984   c0,2.2-1.786,3.985-3.985,3.985c-2.202,0-3.985-1.784-3.985-3.985V23.949z M183.29,175.279c0,4.399-3.564,7.969-7.969,7.969H15.938   c-4.405,0-7.969-3.57-7.969-7.969V55.742H183.29V175.279z M183.29,47.773H7.969V31.918c0-4.403,3.564-7.969,7.969-7.969h7.969   v3.984c0,6.601,5.35,11.954,11.954,11.954c6.6,0,11.954-5.352,11.954-11.954v-3.984h95.63v3.984c0,6.601,5.35,11.954,11.954,11.954   c6.599,0,11.954-5.352,11.954-11.954v-3.984h7.969c4.405,0,7.969,3.566,7.969,7.969V47.773z" fill="#dddfe6" />
          </g>
        </svg>
        <input type="text" id="cardexpiration" className="inputText" name="cardexpiration" placeholder="MM / YYYY" pattern="\d*" title="Card Expiration Date" />
      </p>
      <p className="field">
        <svg id="i-cardback" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve" width="28px" height="28px">
          <g>
            <path d="M63.5,288c-4.142,0-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-16C71,291.358,67.642,288,63.5,288   z" fill="#dddfe6" />
            <path d="M87.5,288c-4.142,0-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-16C95,291.358,91.642,288,87.5,288   z" fill="#dddfe6" />
            <path d="M111.5,288c-4.142,0-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-16   C119,291.358,115.642,288,111.5,288z" fill="#dddfe6" />
            <path d="M135.5,288c-4.142,0-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-16   C143,291.358,139.642,288,135.5,288z" fill="#dddfe6" />
            <path d="M167.5,319c4.142,0,7.5-3.358,7.5-7.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16   C160,315.642,163.358,319,167.5,319z" fill="#dddfe6" />
            <path d="M199,311.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5S199,315.642,199,311.5z" fill="#dddfe6" />
            <path d="M223,311.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5S223,315.642,223,311.5z" fill="#dddfe6" />
            <path d="M239.5,288c-4.142,0-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-16   C247,291.358,243.642,288,239.5,288z" fill="#dddfe6" />
            <path d="M271.5,319c4.142,0,7.5-3.358,7.5-7.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16   C264,315.642,267.358,319,271.5,319z" fill="#dddfe6" />
            <path d="M303,311.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5S303,315.642,303,311.5z" fill="#dddfe6" />
            <path d="M327,311.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5S327,315.642,327,311.5z" fill="#dddfe6" />
            <path d="M351,311.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5S351,315.642,351,311.5z" fill="#dddfe6" />
            <path d="M383,311.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5S383,315.642,383,311.5z" fill="#dddfe6" />
            <path d="M407,311.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5S407,315.642,407,311.5z" fill="#dddfe6" />
            <path d="M431,311.5v-16c0-4.142-3.358-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5S431,315.642,431,311.5z" fill="#dddfe6" />
            <path d="M447.5,288c-4.142,0-7.5,3.358-7.5,7.5v16c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-16   C455,291.358,451.642,288,447.5,288z" fill="#dddfe6" />
            <path d="M447.5,216h-384C50.542,216,40,226.542,40,239.5v8c0,12.958,10.542,23.5,23.5,23.5h384c12.958,0,23.5-10.542,23.5-23.5v-8   C471,226.542,460.458,216,447.5,216z M456,247.5c0,4.687-3.813,8.5-8.5,8.5h-384c-4.687,0-8.5-3.813-8.5-8.5v-8   c0-4.687,3.813-8.5,8.5-8.5h384c4.687,0,8.5,3.813,8.5,8.5V247.5z" fill="#dddfe6" />
            <path d="M447.5,352h-176c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h176c4.142,0,7.5-3.358,7.5-7.5S451.642,352,447.5,352z" fill="#dddfe6" />
            <path d="M239.5,352h-72c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h72c4.142,0,7.5-3.358,7.5-7.5S243.642,352,239.5,352z" fill="#dddfe6" />
            <path d="M511,159.498V127.5c0-21.78-17.72-39.5-39.5-39.5h-432C17.72,88,0,105.72,0,127.5v47.998c0,0.001,0,0.003,0,0.005V383.5   C0,405.28,17.72,423,39.5,423h432c21.78,0,39.5-17.72,39.5-39.5V159.502C511,159.501,511,159.499,511,159.498z M496,184h-6.394   l6.394-6.394V184z M449.606,184l41-41H496v13.394L468.394,184H449.606z M409.606,184l41-41h18.787l-41,41H409.606z M369.606,184   l41-41h18.787l-41,41H369.606z M329.606,184l41-41h18.787l-41,41H329.606z M289.606,184l41-41h18.787l-41,41H289.606z M249.606,184   l41-41h18.787l-41,41H249.606z M209.606,184l41-41h18.787l-41,41H209.606z M169.606,184l41-41h18.787l-41,41H169.606z M129.606,184   l41-41h18.787l-41,41H129.606z M89.606,184l41-41h18.787l-41,41H89.606z M49.606,184l41-41h18.787l-41,41H49.606z M15,184v-5.394   L50.606,143h18.787l-41,41H15z M15,143h14.394L15,157.394V143z M39.5,103h432c13.509,0,24.5,10.991,24.5,24.5v0.5h-8.497   c-0.002,0-0.003,0-0.005,0h-39.995c-0.002,0-0.003,0-0.005,0h-39.995c-0.002,0-0.003,0-0.005,0h-39.995c-0.002,0-0.003,0-0.005,0   h-39.995c-0.002,0-0.003,0-0.005,0h-39.995c-0.002,0-0.004,0-0.005,0h-39.995c-0.001,0-0.003,0-0.005,0h-39.995   c-0.001,0-0.003,0-0.005,0h-39.995c-0.001,0-0.003,0-0.005,0h-39.995c-0.001,0-0.003,0-0.005,0H87.502c-0.001,0-0.003,0-0.005,0   H47.502c-0.001,0-0.003,0-0.005,0H15v-0.5C15,113.991,25.991,103,39.5,103z M471.5,408h-432C25.991,408,15,397.009,15,383.5V199   h481v184.5C496,397.009,485.009,408,471.5,408z" fill="#dddfe6" />
          </g>
        </svg>
        <input type="text" id="cardcvc" className="inputText" name="cardcvc" placeholder="123" pattern="\d*" title="CVC Code" />
      </p>
    </div>
  </div>
);

const addressInput = (address, setAddress, focus, setFocus) => (
  <div className={ `${focus ? 'focus-Medium' : 'txtb-Medium'}` }>
    <label htmlFor="address">
      Rua
      <input
        type="text"
        data-testid="checkout-street-input"
        id="address"
        onChange={ (event) => setAddress(event.target.value) }
        value={ address }
        placeholder="Address"
        className="checkout-street-input"
        onFocus={ () => setFocus(true) }
        onBlur={ () => setFocus(false) }
      />
      <span />
    </label>
  </div>
);

const numberInput = (number, setNumber, focus, setFocus) => (
  <div className={ `${focus ? 'focus-Medium' : 'txtb-Medium'}` }>
    <label htmlFor="number">
      Número da casa
      <input
        type="text"
        data-testid="checkout-house-number-input"
        id="number"
        onChange={ (event) => setNumber(event.target.value) }
        value={ number }
        placeholder="number"
        className="checkout-house-number-input"
        onFocus={ () => setFocus(true) }
        onBlur={ () => setFocus(false) }
      />
      <span />
    </label>
  </div>
);

const excludeProduct = async (
  product, purchase, setPurchase, setTotal, setMessage,
) => {
  const purchaseWithoutItem = await purchase.filter((elem) => elem.id !== product.id);
  setPurchase(purchaseWithoutItem);
  localStorage.setItem('inProcessPurchase', JSON.stringify(purchaseWithoutItem));
  if (purchaseWithoutItem.length === 0) {
    setMessage('Não há produtos no carrinho');
  }
  const newtotal = purchaseWithoutItem.reduce((acc, elem) => (parseFloat(acc) + (parseFloat(elem.price) * parseFloat(elem.amount))), 0);
  setTotal(parseFloat(newtotal).toFixed(2).replace('.', ','));
};

const renderButtons = (
  index, id, purchase, setPurchase, setTotal, setMessage,
) => {
  const product = purchase.filter((e) => e.id === id)[0];
  return (
    <div className="removal-button-container">
      <button
        onClick={ () => excludeProduct(
          product, purchase, setPurchase, setTotal, setMessage,
        ) }
        type="button"
        data-testid={ `${index}-removal-button` }
        className="my-product-price"
      >
          X
      </button>
    </div>
  );
};

const productsCards = (purchase, setPurchase, setTotal, setMessage) => (
  <div className="checkout-container-card">
    {purchase.map((e, index) => {
      const totalProduct = (parseFloat(e.price) * parseInt(e.amount)).toFixed(2).replace('.', ',');
      return (
        <div>
          <div className="checkout-products-card">
            <p data-testid={ `${index}-product-qtd-input` }>{e.amount}</p>
            <p data-testid={ `${index}-product-name` }>{e.name}</p>
            <p data-testid={ `${index}-product-total-value` }>
              R$
              {totalProduct}
            </p>
            <p data-testid={ `${index}-product-unit-price` }>
              {`(R$ ${parseFloat(e.price).toFixed(2).replace('.', ',')} un)`}
            </p>
            {renderButtons(
              index, e.id, purchase, setPurchase, setTotal, setMessage,
            )}
          </div>
        </div>
      );
    })}
  </div>
);

const checkoutButton = (clickToProducts, isDisabled) => (
  <div>
    <button
      type="button"
      className={ isDisabled() ? 'disabled-checkout-finish-btn' : 'checkout-finish-btn' }
      data-testid="checkout-finish-btn"
      onClick={ () => clickToProducts() }
      disabled={ isDisabled() }
    >
      Finalizar Pedido
    </button>
  </div>
);

const saveIndividualProduct = async (elem, saleId) => {
  await saveSaleProducts(saleId, elem.id, elem.amount);
};

const savePurchase = async (saleId, purchase) => (
  Promise.all(purchase.map((elem) => saveIndividualProduct(elem, saleId)))
);

function UserCheckout() {
  const [purchase, setPurchase] = useState([]);
  const [total, setTotal] = useState(0);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusAdress, setFocusAdress] = useState(false);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const actualUser = JSON.parse(localStorage.getItem('user'));
    if (!actualUser) return window.location.assign('http://localhost:3000/login');
    setEmail(actualUser.data.email);
    const actualPurchase = JSON.parse(localStorage.getItem('inProcessPurchase'));
    setPurchase(actualPurchase);
    const actualTotal = actualPurchase.reduce((acc, elem) => (parseFloat(acc) + parseFloat(elem.price) * elem.amount).toFixed(2).replace('.', ','), 0);
    setTotal(actualTotal);
  }, []);

  const clickToProducts = async () => {
    let date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    date = `${year}-${month}-${day}`;
    const registerResponse = await createSale(email, total, address, number, date);
    setMessage(registerResponse.data.message);
    savePurchase(registerResponse.data.saleId, purchase);
    localStorage.setItem('inProcessPurchase', JSON.stringify([]));
    setTimeout(() => {
      setMessage('');
      history.push('/products');
    }, 4000);
  };

  const isDisabled = () => {
    if (total !== '0,00' && address !== '' && number !== '') {
      return false;
    }
    return true;
  };

  return (
    <div className="checkout-container">
      {TopMenu('Finalizar Pedido')}
      <h3>{message}</h3>
      {productsCards(purchase, setPurchase, setTotal, setMessage)}
      {cardInput()}
      <h4 data-testid="order-total-value" className="order-total-value">
        Total: R$
        {' '}
        {total === 0 ? '0,00' : total}
      </h4>
      {addressInput(address, setAddress, focusEmail, setFocusEmail)}
      {numberInput(number, setNumber, focusAdress, setFocusAdress)}
      {checkoutButton(clickToProducts, isDisabled)}
    </div>
  );
}

export default UserCheckout;
