'use client';
import { useEffect, useRef } from 'react';

export default function ExternalWebComponent() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.srcdoc = `
        <!DOCTYPE html>
        <html lang="vi">

        <head>
          <meta charset="UTF-8">
          <title>Cardano Bootcamp &#38; Hackathon 2024 - VBI Academy</title>
          <meta http-equiv="Cache-Control" content="no-cache">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta http-equiv="Expires" content="-1">
          <meta name="keywords"
            content="cardano, cardano hackathon, cardano bootcamp, hoc lap trinh web3, vbi academy, hoc vien vbi">
          <meta name="description"
            content="Chương trình đào tập lập trình với Cardano được tổ chức bởi VBI Academy cùng Cardano Foundation sẽ giúp cho các bạn lập trình viên tiếp cận Cardano Blockchain và đồng thời cũng tạo sân chơi ngay khi các bạn hoàn thành">
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <script
            type='text/javascript'>window.ladi_viewport = function (b) { var a = document; b = b ? b : 'innerWidth'; var c = window[b]; var d = c < 768; if (typeof window.ladi_is_desktop == "undefined" || window.ladi_is_desktop == undefined) { window.ladi_is_desktop = !d; } var e = 1200; var f = 420; var g = ''; if (!d) { g = "width=" + e + ",user-scalable=no,initial-scale=1.0"; } else { var h = 1; var i = f; if (i != c) { h = c / i; } g = "width=" + i + ",user-scalable=no,initial-scale=" + h + ",minimum-scale=" + h + ",maximum-scale=" + h; } var j = a.getElementById("viewport"); if (!j) { j = a.createElement("meta"); j.id = "viewport"; j.name = "viewport"; a.head.appendChild(j); } j.setAttribute("content", g); }; window.ladi_viewport(); window.ladi_fbq_data = []; window.ladi_fbq = function () { window.ladi_fbq_data.push(arguments); }; window.ladi_ttq_data = []; window.ladi_ttq = function () { window.ladi_ttq_data.push(arguments); };</script>
          <link rel="canonical" href="https://cardano.openedu101.com" />
          <meta property="og:url" content="https://cardano.openedu101.com" />
          <meta property="og:title" content="Cardano Bootcamp &#38; Hackathon 2024 - VBI Academy" />
          <meta property="og:type" content="website" />
          <meta property="og:image"
            content="https://static.ladipage.net/6684efaadbba9e0011a029ed/banner-course-2-20241002033408-n04er.png">
          <meta property="og:description"
            content="Chương trình đào tập lập trình với Cardano được tổ chức bởi VBI Academy cùng Cardano Foundation sẽ giúp cho các bạn lập trình viên tiếp cận Cardano Blockchain và đồng thời cũng tạo sân chơi ngay khi các bạn hoàn thành" />
          <meta name="format-detection" content="telephone=no" />
          <link rel="dns-prefetch">
          <link rel="preconnect" href="https://fonts.googleapis.com/" crossorigin>
          <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
          <link rel="preconnect" href="https://w.ladicdn.com/" crossorigin>
          <link rel="preconnect" href="https://s.ladicdn.com/" crossorigin>
          <link rel="preconnect" href="https://api1.ldpform.com/" crossorigin>
          <link rel="preconnect" href="https://a.ladipage.com/" crossorigin>
          <link rel="preconnect" href="https://api.sales.ldpform.net/" crossorigin>
          <link rel="preload" href="https://w.ladicdn.com/v4/source/ladipagev3.min.js?v=1727777324061" as="script">
          <style id="style_ladi" type="text/css">
            a,
            abbr,
            acronym,
            address,
            applet,
            article,
            aside,
            audio,
            b,
            big,
            blockquote,
            body,
            button,
            canvas,
            caption,
            center,
            cite,
            code,
            dd,
            del,
            details,
            dfn,
            div,
            dl,
            dt,
            em,
            embed,
            fieldset,
            figcaption,
            figure,
            footer,
            form,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            header,
            hgroup,
            html,
            i,
            iframe,
            img,
            input,
            ins,
            kbd,
            label,
            legend,
            li,
            mark,
            menu,
            nav,
            object,
            ol,
            output,
            p,
            pre,
            q,
            ruby,
            s,
            samp,
            section,
            select,
            small,
            span,
            strike,
            strong,
            sub,
            summary,
            sup,
            table,
            tbody,
            td,
            textarea,
            tfoot,
            th,
            thead,
            time,
            tr,
            tt,
            u,
            ul,
            var,
            video {
              margin: 0;
              padding: 0;
              border: 0;
              outline: 0;
              font-size: 100%;
              font: inherit;
              vertical-align: baseline;
              box-sizing: border-box;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale
            }

            article,
            aside,
            details,
            figcaption,
            figure,
            footer,
            header,
            hgroup,
            menu,
            nav,
            section {
              display: block
            }

            body {
              line-height: 1
            }

            a {
              text-decoration: none
            }

            ol,
            ul {
              list-style: none
            }

            blockquote,
            q {
              quotes: none
            }

            blockquote:after,
            blockquote:before,
            q:after,
            q:before {
              content: '';
              content: none
            }

            table {
              border-collapse: collapse;
              border-spacing: 0
            }

            .ladi-loading {
              z-index: 900000000000;
              position: fixed;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background-color: rgba(0, 0, 0, .1)
            }

            .ladi-loading .loading {
              width: 80px;
              height: 80px;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              margin: auto;
              overflow: hidden;
              position: absolute
            }

            .ladi-loading .loading div {
              position: absolute;
              width: 6px;
              height: 6px;
              background: #fff;
              border-radius: 50%;
              animation: ladi-loading 1.2s linear infinite
            }

            .ladi-loading .loading div:nth-child(1) {
              animation-delay: 0s;
              top: 37px;
              left: 66px
            }

            .ladi-loading .loading div:nth-child(2) {
              animation-delay: -.1s;
              top: 22px;
              left: 62px
            }

            .ladi-loading .loading div:nth-child(3) {
              animation-delay: -.2s;
              top: 11px;
              left: 52px
            }

            .ladi-loading .loading div:nth-child(4) {
              animation-delay: -.3s;
              top: 7px;
              left: 37px
            }

            .ladi-loading .loading div:nth-child(5) {
              animation-delay: -.4s;
              top: 11px;
              left: 22px
            }

            .ladi-loading .loading div:nth-child(6) {
              animation-delay: -.5s;
              top: 22px;
              left: 11px
            }

            .ladi-loading .loading div:nth-child(7) {
              animation-delay: -.6s;
              top: 37px;
              left: 7px
            }

            .ladi-loading .loading div:nth-child(8) {
              animation-delay: -.7s;
              top: 52px;
              left: 11px
            }

            .ladi-loading .loading div:nth-child(9) {
              animation-delay: -.8s;
              top: 62px;
              left: 22px
            }

            .ladi-loading .loading div:nth-child(10) {
              animation-delay: -.9s;
              top: 66px;
              left: 37px
            }

            .ladi-loading .loading div:nth-child(11) {
              animation-delay: -1s;
              top: 62px;
              left: 52px
            }

            .ladi-loading .loading div:nth-child(12) {
              animation-delay: -1.1s;
              top: 52px;
              left: 62px
            }

            @keyframes ladi-loading {

              0%,
              100%,
              20%,
              80% {
                transform: scale(1)
              }

              50% {
                transform: scale(1.5)
              }
            }

            .ladipage-message {
              position: fixed;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              z-index: 10000000000;
              background: rgba(0, 0, 0, .3)
            }

            .ladipage-message .ladipage-message-box {
              width: 400px;
              max-width: calc(100% - 50px);
              height: 160px;
              border: 1px solid rgba(0, 0, 0, .3);
              background-color: #fff;
              position: fixed;
              top: calc(50% - 155px);
              left: 0;
              right: 0;
              margin: auto;
              border-radius: 10px
            }

            .ladipage-message .ladipage-message-box span {
              display: block;
              background-color: rgba(6, 21, 40, .05);
              color: #000;
              padding: 12px 15px;
              font-weight: 600;
              font-size: 16px;
              line-height: 16px;
              border-top-left-radius: 10px;
              border-top-right-radius: 10px
            }

            .ladipage-message .ladipage-message-box .ladipage-message-text {
              display: -webkit-box;
              font-size: 14px;
              padding: 0 20px;
              margin-top: 10px;
              line-height: 18px;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              word-break: break-word
            }

            .ladipage-message .ladipage-message-box .ladipage-message-close {
              display: block;
              position: absolute;
              right: 15px;
              bottom: 10px;
              margin: 0 auto;
              padding: 10px 0;
              border: none;
              width: 80px;
              text-transform: uppercase;
              text-align: center;
              color: #000;
              background-color: #e6e6e6;
              border-radius: 5px;
              text-decoration: none;
              font-size: 14px;
              line-height: 14px;
              font-weight: 600;
              cursor: pointer;
              outline: 0
            }

            .lightbox-screen {
              display: none;
              position: fixed;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              margin: auto;
              z-index: 9000000080;
              background: rgba(0, 0, 0, .5)
            }

            .lightbox-screen .lightbox-close {
              position: absolute;
              z-index: 9000000090;
              cursor: pointer
            }

            .lightbox-screen .lightbox-hidden {
              display: none
            }

            .lightbox-screen .lightbox-close {
              width: 16px;
              height: 16px;
              margin: 10px;
              background-repeat: no-repeat;
              background-position: center center;
              background-image: url("data:image/svg+xml;utf8, %3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%23fff%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M23.4144%202.00015L2.00015%2023.4144L0.585938%2022.0002L22.0002%200.585938L23.4144%202.00015Z%22%3E%3C%2Fpath%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.00015%200.585938L23.4144%2022.0002L22.0002%2023.4144L0.585938%202.00015L2.00015%200.585938Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E")
            }

            body {
              font-size: 12px;
              -ms-text-size-adjust: none;
              -moz-text-size-adjust: none;
              -o-text-size-adjust: none;
              -webkit-text-size-adjust: none;
              background-color: #fff;
            }

            .overflow-hidden {
              overflow: hidden;
            }

            .ladi-transition {
              transition: all 150ms linear 0s;
            }

            .z-index-1 {
              z-index: 1;
            }

            .opacity-0 {
              opacity: 0;
            }

            .height-0 {
              height: 0 !important;
            }

            .pointer-events-none {
              pointer-events: none;
            }

            .transition-parent-collapse-height {
              transition: height 150ms linear 0s;
            }

            .transition-parent-collapse-top {
              transition: top 150ms linear 0s;
            }

            .transition-readmore {
              transition: height 350ms linear 0s;
            }

            .transition-collapse {
              transition: height 150ms linear 0s;
            }

            body.grab {
              cursor: grab;
            }

            .ladi-wraper {
              width: 100%;
              min-height: 100%;
              overflow: hidden;
            }

            .ladi-container {
              position: relative;
              margin: 0 auto;
              height: 100%;
            }

            .ladi-overlay {
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              pointer-events: none;
            }

            .ladi-element {
              position: absolute;
            }

            @media (hover: hover) {
              .ladi-check-hover {
                opacity: 0;
              }
            }

            .ladi-section {
              margin: 0 auto;
              position: relative;
            }

            .ladi-section[data-tab-id] {
              display: none;
            }

            .ladi-section.selected[data-tab-id] {
              display: block;
            }

            .ladi-section .ladi-section-background {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              pointer-events: none;
              overflow: hidden;
            }

            .ladi-box {
              position: absolute;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }

            .ladi-frame {
              position: absolute;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }

            .ladi-frame-bg .ladi-frame-background {
              height: 100%;
              width: 100%;
              pointer-events: none;
              transition: inherit;
            }

            .ladi-frame-bg:not(.ladi-frame) {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }

            #SECTION_POPUP .ladi-container {
              z-index: 90000070;
            }

            #SECTION_POPUP .ladi-container>.ladi-element {
              z-index: 90000070;
              position: fixed;
              display: none;
            }

            #SECTION_POPUP .ladi-container>.ladi-element[data-fixed-close="true"] {
              position: relative !important;
            }

            #SECTION_POPUP .ladi-container>.ladi-element.hide-visibility {
              display: block !important;
              visibility: hidden !important;
            }

            #SECTION_POPUP .popup-close {
              position: absolute;
              right: 0px;
              top: 0px;
              z-index: 9000000080;
              cursor: pointer;
              width: 16px;
              height: 16px;
              margin: 10px;
              background-repeat: no-repeat;
              background-position: center center;
              background-image: url("data:image/svg+xml;utf8, %3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%23000%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M23.4144%202.00015L2.00015%2023.4144L0.585938%2022.0002L22.0002%200.585938L23.4144%202.00015Z%22%3E%3C%2Fpath%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.00015%200.585938L23.4144%2022.0002L22.0002%2023.4144L0.585938%202.00015L2.00015%200.585938Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E");
            }

            .ladi-popup {
              position: absolute;
              width: 100%;
              height: 100%;
            }

            .ladi-popup .ladi-popup-background {
              height: 100%;
              width: 100%;
              pointer-events: none;
            }

            .ladi-countdown {
              position: absolute;
              width: 100%;
              height: 100%;
              display: flex;
            }

            .ladi-countdown .ladi-countdown-background {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              background-size: inherit;
              background-attachment: inherit;
              background-origin: inherit;
              display: table;
              pointer-events: none;
            }

            .ladi-countdown .ladi-countdown-text {
              position: absolute;
              width: 100%;
              height: 100%;
              text-decoration: inherit;
              display: table;
              pointer-events: none;
            }

            .ladi-countdown .ladi-countdown-text span {
              display: table-cell;
              vertical-align: middle;
            }

            .ladi-countdown>.ladi-element {
              text-decoration: inherit;
              background-size: inherit;
              background-attachment: inherit;
              background-origin: inherit;
              position: relative;
              display: inline-block;
            }

            .ladi-countdown>.ladi-element:last-child {
              margin-right: 0px !important;
            }

            .ladi-button {
              position: absolute;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }

            .ladi-button:active {
              transform: translateY(2px);
              transition: transform 0.2s linear;
            }

            .ladi-button .ladi-button-background {
              height: 100%;
              width: 100%;
              pointer-events: none;
              transition: inherit;
            }

            .ladi-button>.ladi-button-headline,
            .ladi-button>.ladi-button-shape {
              width: 100% !important;
              height: 100% !important;
              top: 0 !important;
              left: 0 !important;
              display: table;
              user-select: none;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
            }

            .ladi-button>.ladi-button-shape .ladi-shape {
              margin: auto;
              top: 0;
              bottom: 0;
            }

            .ladi-button>.ladi-button-headline .ladi-headline {
              display: table-cell;
              vertical-align: middle;
            }

            .ladi-button-group {
              position: absolute;
              width: 100%;
              height: 100%;
            }

            .ladi-button-group>.ladi-element {
              transition: inherit;
            }

            .ladi-button-group>.ladi-element>.ladi-button {
              transition: inherit;
            }

            .ladi-group {
              position: absolute;
              width: 100%;
              height: 100%;
            }

            .ladi-accordion {
              position: absolute;
              width: 100%;
              height: 100%;
            }

            .ladi-accordion .ladi-accordion-shape {
              width: 100% !important;
              height: 100% !important;
              top: 0 !important;
              left: 0 !important;
              display: table;
              user-select: none;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
            }

            .ladi-accordion .accordion-menu>.ladi-frame>.ladi-element:not(.ladi-accordion-shape) {
              z-index: 2;
            }

            .ladi-shape {
              position: absolute;
              width: 100%;
              height: 100%;
              pointer-events: none;
            }

            .ladi-cart-number {
              position: absolute;
              top: -2px;
              right: -7px;
              background: #f36e36;
              text-align: center;
              width: 18px;
              height: 18px;
              line-height: 18px;
              font-size: 12px;
              font-weight: bold;
              color: #fff;
              border-radius: 100%;
            }

            .ladi-image {
              position: absolute;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }

            .ladi-image .ladi-image-background {
              background-repeat: no-repeat;
              background-position: left top;
              background-size: cover;
              background-attachment: scroll;
              background-origin: content-box;
              position: absolute;
              margin: 0 auto;
              width: 100%;
              height: 100%;
              pointer-events: none;
            }

            .ladi-headline {
              width: 100%;
              display: inline-block;
              word-break: break-word;
              background-size: cover;
              background-position: center center;
            }

            .ladi-headline a {
              text-decoration: underline;
            }

            .ladi-paragraph {
              width: 100%;
              display: inline-block;
              word-break: break-word;
            }

            .ladi-paragraph a {
              text-decoration: underline;
            }

            .ladi-line {
              position: relative;
            }

            .ladi-line .ladi-line-container {
              border-bottom: 0 !important;
              border-right: 0 !important;
              width: 100%;
              height: 100%;
            }

            .ladi-menu {
              position: absolute;
            }

            .ladi-menu.list-menu-items.theme-1 {
              z-index: 1;
              display: flex;
              width: fit-content;
              height: 100%;
              margin: 0 auto;
              left: 0;
              right: 0;
            }

            .ladi-menu.list-menu-items.theme-1 .ladi-menu-item {
              cursor: pointer;
              display: inline-flex;
              align-items: center;
              align-self: center;
              position: relative;
              transition: all 150ms linear 0s, visibility 0s;
            }

            .ladi-menu.list-menu-items.theme-1 .ladi-menu-item>ul {
              visibility: hidden;
              opacity: 0;
              display: flex;
              position: absolute;
              top: 35px;
              width: max-content;
              gap: 10px;
              flex-flow: column;
              padding: 5px 10px;
            }

            .ladi-menu.list-menu-items.theme-1 .ladi-menu-item>ul:before {
              content: "";
              position: absolute;
              top: -35px;
              left: 0;
              width: 100%;
              height: 50px;
            }

            .ladi-menu.list-menu-items.theme-1 .ladi-menu-item>ul>.ladi-menu-item {
              width: 100%;
            }

            .ladi-menu.list-menu-items.theme-1 .ladi-menu-item:hover>ul {
              visibility: visible;
              opacity: 1;
            }

            .ladi-menu.list-menu-items.theme-1>.ladi-menu-item>ul .ladi-menu-item>ul {
              left: 100%;
              transform: translate(20px, -5px);
              top: 0;
            }

            .ladi-menu.list-menu-items.theme-1>.ladi-menu-item>ul .ladi-menu-item>ul:before {
              top: 0;
              left: -35px;
              height: 100%;
              width: 50px;
            }

            .popup-menu-mobile .ladi-menu.list-menu-items.theme-1,
            #POPUP_MENU_MOBILE .ladi-menu.list-menu-items.theme-1 {
              margin: 0;
            }

            .popup-menu-mobile .ladi-menu.list-menu-items.theme-1 .ladi-menu-item,
            #POPUP_MENU_MOBILE .ladi-menu.list-menu-items.theme-1 .ladi-menu-item {
              display: block;
              align-self: baseline;
            }

            .popup-menu-mobile .ladi-menu.list-menu-items.theme-1 .ladi-menu-item ul {
              position: relative;
            }

            .popup-menu-mobile .ladi-menu.list-menu-items.theme-1 .ladi-menu-item a,
            #POPUP_MENU_MOBILE .ladi-menu.list-menu-items.theme-1 .ladi-menu-item a {
              padding-right: 20px;
              position: relative;
            }

            .popup-menu-mobile .ladi-menu.list-menu-items.theme-1 .ladi-menu-item[data-child="true"]>a {
              pointer-events: none;
            }

            .popup-menu-mobile .ladi-menu.list-menu-items.theme-1 .ladi-menu-item[data-child="true"]>a:before,
            #POPUP_MENU_MOBILE .ladi-menu.list-menu-items.theme-1 .ladi-menu-item[data-child="true"]>a:before {
              content: "";
              background-image: url("data:image/svg+xml;utf8, %3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22%23fff%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.95437%2010.3254C3.13408%2010.535%203.44973%2010.5593%203.65939%2010.3796L8.00066%206.65853L12.3419%2010.3796C12.5516%2010.5593%2012.8672%2010.535%2013.047%2010.3254C13.2267%2010.1157%2013.2024%209.80007%2012.9927%209.62036L8.32606%205.62036C8.13881%205.45987%207.86251%205.45987%207.67526%205.62036L3.0086%209.62036C2.79893%209.80007%202.77465%2010.1157%202.95437%2010.3254Z%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E");
              background-position: top right;
              background-size: 20px;
              background-repeat: no-repeat;
              background-position-y: 3px;
              position: absolute;
              right: -3px;
              width: 20px;
              height: 20px;
              transform: rotate(180deg);
              top: 5px;
            }

            .popup-menu-mobile .ladi-menu.list-menu-items.theme-1 .ladi-menu-item ul {
              visibility: hidden;
              opacity: 0;
              display: none !important;
            }

            .popup-menu-mobile .ladi-menu.list-menu-items.theme-1 .ladi-menu-item.open>a:before {
              transform: rotate(0deg);
              top: 0;
            }

            .popup-menu-mobile .ladi-menu.list-menu-items.theme-1 .ladi-menu-item.open>ul {
              visibility: visible;
              opacity: 1;
              display: flex !important;
              top: 5px;
            }

            .popup-menu-mobile .ladi-menu.list-menu-items.theme-1 ul {
              display: flex !important;
              visibility: visible;
              opacity: 1;
              background: transparent;
              padding: 0;
              top: 35px;
              transform: translate(20px, 0);
              left: 0;
            }

            .popup-menu-mobile .ladi-menu.list-menu-items.theme-1>.ladi-menu-item .ladi-menu-item ul {
              left: 0;
              transform: translate(20px, 0);
            }

            .ladi-menu.menu-icon-item {
              width: 100%;
              height: 100%;
              -webkit-mask-size: 100% 100%;
              mask-size: 100% 100%;
              cursor: pointer;
            }

            .ladi-menu.menu-icon-item.theme-1.menu-icon-1 {
              -webkit-mask-image: url(https://w.ladicdn.com/v2/source/builder/svg/menu_icon1.svg?v=1.0);
              mask-image: url(https://w.ladicdn.com/v2/source/builder/svg/menu_icon1.svg?v=1.0);
            }

            .ladi-menu.menu-icon-item.theme-1.menu-icon-2 {
              -webkit-mask-image: url(https://w.ladicdn.com/v2/source/builder/svg/menu_icon2.svg?v=1.0);
              mask-image: url(https://w.ladicdn.com/v2/source/builder/svg/menu_icon2.svg?v=1.0);
            }

            .ladi-menu.menu-icon-item.theme-1.menu-icon-3 {
              -webkit-mask-image: url(https://w.ladicdn.com/v2/source/builder/svg/menu_icon3.svg?v=1.0);
              mask-image: url(https://w.ladicdn.com/v2/source/builder/svg/menu_icon3.svg?v=1.0);
            }

            .ladi-menu.menu-icon-item.theme-1.menu-icon-4 {
              -webkit-mask-image: url(https://w.ladicdn.com/v2/source/builder/svg/menu_icon4.svg?v=1.0);
              mask-image: url(https://w.ladicdn.com/v2/source/builder/svg/menu_icon4.svg?v=1.0);
            }

            .ladi-popup .ladi-menu.menu-icon-item {
              display: none;
            }

            .ladi-popup .ladi-menu.list-menu-items {
              display: flex;
              flex-flow: column;
            }

            #SECTION_POPUP>.ladi-container>.ladi-element[id^="POPUP_MENU_MOBILE"][data-dropbox="true"] {
              display: none;
            }

            .popup-menu-mobile {
              width: 100% !important;
              height: 100% !important;
              position: fixed !important;
              top: 0 !important;
              left: 0 !important;
              max-height: 100% !important;
            }

            .popup-menu-mobile .ladi-popup {
              min-height: 100%;
            }

            .popup-menu-mobile .ladi-popup,
            .popup-menu-mobile .ladi-popup-background {
              width: 100%;
              height: 100%;
            }

            .popup-menu-mobile .ladi-element .ladi-menu.menu-icon-item {
              display: none !important;
            }

            .popup-menu-mobile .ladi-element .ladi-menu.list-menu-items {
              display: flex !important;
            }

            .popup-menu-mobile .popup-close {
              position: absolute;
              width: 24px;
              height: 24px;
              top: 10px;
              right: 10px;
              cursor: pointer;
              background-color: #fff;
              -webkit-mask-size: 100% 100%;
              mask-size: 100% 100%;
              -webkit-mask-image: url("data:image/svg+xml;utf8, %3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%23fff%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M23.4144%202.00015L2.00015%2023.4144L0.585938%2022.0002L22.0002%200.585938L23.4144%202.00015Z%22%3E%3C%2Fpath%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.00015%200.585938L23.4144%2022.0002L22.0002%2023.4144L0.585938%202.00015L2.00015%200.585938Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E");
              mask-image: url("data:image/svg+xml;utf8, %3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22%23fff%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M23.4144%202.00015L2.00015%2023.4144L0.585938%2022.0002L22.0002%200.585938L23.4144%202.00015Z%22%3E%3C%2Fpath%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.00015%200.585938L23.4144%2022.0002L22.0002%2023.4144L0.585938%202.00015L2.00015%200.585938Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E");
            }

            a[data-action] {
              user-select: none;
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              cursor: pointer
            }

            a:visited {
              color: inherit
            }

            a:link {
              color: inherit
            }

            [data-opacity="0"] {
              opacity: 0
            }

            [data-hidden="true"] {
              display: none
            }

            [data-action="true"] {
              cursor: pointer
            }

            .ladi-hidden {
              display: none
            }

            .ladi-animation-hidden {
              visibility: hidden !important;
              opacity: 0 !important
            }

            .element-click-selected {
              cursor: pointer
            }

            .is-2nd-click {
              cursor: pointer
            }

            .ladi-button-shape.is-2nd-click,
            .ladi-accordion-shape.is-2nd-click {
              z-index: 1
            }

            .backdrop-popup {
              display: none;
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 90000060
            }

            .backdrop-dropbox {
              display: none;
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 90000040
            }

            .ladi-lazyload {
              background-image: none !important;
            }

            .ladi-list-paragraph ul li.ladi-lazyload:before {
              background-image: none !important;
            }

            #BODY_BACKGROUND {
              position: fixed;
              pointer-events: none;
              top: 0;
              left: 0;
              right: 0;
              margin: 0 auto;
              height: 100vh !important;
            }

            @media (min-width: 768px) {
              .ladi-menu.menu-icon-item.theme-1 {
                display: none;
              }

              .popup-menu-mobile {
                display: none;
              }
            }

            @media (max-width: 767px) {
              .ladi-element.ladi-auto-scroll {
                overflow-x: auto;
                overflow-y: hidden;
                width: 100% !important;
                left: 0 !important;
                -webkit-overflow-scrolling: touch;
              }

              [data-hint]:not([data-timeout-id-copied]):before,
              [data-hint]:not([data-timeout-id-copied]):after {
                display: none !important;
              }

              .ladi-section.ladi-auto-scroll {
                overflow-x: auto;
                overflow-y: hidden;
                -webkit-overflow-scrolling: touch;
              }

              .ladi-menu.list-menu-items.theme-1 {
                display: none;
              }
            }
          </style>
          <style id="style_page" type="text/css">
            body {
              direction: ltr;
            }

            @media (min-width: 768px) {
              .ladi-section .ladi-container {
                width: 1200px;
              }
            }

            @media (max-width: 767px) {
              .ladi-section .ladi-container {
                width: 420px;
              }
            }

            @font-face {
              font-family: "SWZXItUmVndWxhcidGY";
              src: url("https://w.ladicdn.com/6684efaadbba9e0011a029ed/inter-regular-20240718095850-hif_u.ttf") format("truetype");
            }

            @font-face {
              font-family: "SWZXItQmsZCdGY";
              src: url("https://w.ladicdn.com/6684efaadbba9e0011a029ed/inter-bold-20240718095844-faqah.ttf") format("truetype");
            }

            @font-face {
              font-family: "SWZXItUmVndWxhcidGY";
              src: url("https://w.ladicdn.com/6684efaadbba9e0011a029ed/inter-regular-20240718095850-hif_u.ttf") format("truetype");
            }

            body {
              font-family: SWZXItUmVndWxhcidGY
            }
          </style>
          <style id="style_element" type="text/css">
            #BODY_BACKGROUND,
            #SECTION_POPUP {
              height: 0px;
            }

            #BODY_BACKGROUND>.ladi-section-background,
            #BUTTON8>.ladi-button>.ladi-button-background,
            #SECTION16>.ladi-section-background,
            #BUTTON22>.ladi-button>.ladi-button-background,
            #BUTTON18>.ladi-button>.ladi-button-background,
            #BUTTON25>.ladi-button>.ladi-button-background,
            #BUTTON26>.ladi-button>.ladi-button-background,
            #BUTTON27>.ladi-button>.ladi-button-background,
            #POPUP28>.ladi-popup>.ladi-popup-background {
              background-color: rgb(255, 255, 255);
            }

            #BODY_BACKGROUND>.ladi-section-background {
              opacity: 0;
            }

            #HEADER>.ladi-section-background,
            #BOOTCAMP>.ladi-section-background,
            #SECTION17>.ladi-section-background {
              background-color: rgb(217, 217, 217);
            }

            #HEADER>.ladi-section-background {
              opacity: 0.9;
            }

            #MENU1>.ladi-menu .ladi-menu-item {
              font-size: 16px;
              line-height: 1.6;
              color: rgb(0, 0, 0);
              text-align: left;
            }

            #MENU1>.ladi-menu .ladi-menu-item,
            #MENU42>.ladi-menu .ladi-menu-item {
              -webkit-text-stroke-width: 0px;
            }

            #MENU1>.ladi-menu .ladi-menu-item:hover,
            #MENU1>.ladi-menu .ladi-menu-item.selected {
              color: rgb(255, 147, 57);
            }

            #MENU1>.ladi-menu .ladi-menu-item:hover,
            #MENU1>.ladi-menu .ladi-menu-item.selected,
            #BUTTON3>.ladi-button:hover,
            #BUTTON_TEXT3>.ladi-headline:hover,
            #IMAGE1:hover>.ladi-image,
            #IMAGE4:hover>.ladi-image,
            #BUTTON8>.ladi-button:hover,
            #BUTTON_TEXT8>.ladi-headline:hover,
            #HEADLINE11>.ladi-headline:hover,
            #HEADLINE12>.ladi-headline:hover,
            #IMAGE37:hover>.ladi-image,
            #IMAGE38:hover>.ladi-image,
            #BUTTON13>.ladi-button:hover,
            #BUTTON_TEXT13>.ladi-headline:hover,
            #BUTTON11>.ladi-button:hover,
            #BUTTON_TEXT11>.ladi-headline:hover,
            #BUTTON23>.ladi-button:hover,
            #BUTTON_TEXT23>.ladi-headline:hover,
            #BOX9>.ladi-box:hover,
            #BOX14>.ladi-box:hover,
            #BOX15>.ladi-box:hover,
            #BUTTON12>.ladi-button:hover,
            #BUTTON_TEXT12>.ladi-headline:hover,
            #BUTTON24>.ladi-button:hover,
            #BUTTON_TEXT24>.ladi-headline:hover,
            #MENU42>.ladi-menu .ladi-menu-item:hover,
            #MENU42>.ladi-menu .ladi-menu-item.selected {
              opacity: 1;
            }

            #MENU1>.ladi-menu.list-menu-items {
              gap: 36px;
            }

            #MENU1>.ladi-menu.menu-icon-item {
              background-color: rgb(0, 0, 0);
            }

            #BUTTON3>.ladi-button>.ladi-button-background,
            #HERO>.ladi-overlay,
            #BUTTON13>.ladi-button>.ladi-button-background,
            #BUTTON11>.ladi-button>.ladi-button-background,
            #BUTTON23>.ladi-button>.ladi-button-background,
            #BUTTON12>.ladi-button>.ladi-button-background,
            #BUTTON24>.ladi-button>.ladi-button-background {
              background-color: rgb(39, 39, 39);
            }

            #BUTTON3>.ladi-button,
            #BUTTON13>.ladi-button,
            #BUTTON11>.ladi-button,
            #BUTTON23>.ladi-button,
            #BUTTON12>.ladi-button,
            #BUTTON24>.ladi-button {
              border-width: 1px;
              border-radius: 100px;
              border-color: rgb(244, 64, 37);
            }

            #BUTTON_TEXT3,
            #BUTTON_TEXT8,
            #BUTTON_TEXT13,
            #BUTTON_TEXT11,
            #BUTTON_TEXT23,
            #BUTTON_TEXT22,
            #BUTTON_TEXT18,
            #BUTTON_TEXT25,
            #BUTTON_TEXT26,
            #BUTTON_TEXT27,
            #BUTTON_TEXT12,
            #BUTTON_TEXT24 {
              top: 9px;
              left: 0px;
            }

            #BUTTON_TEXT3>.ladi-headline,
            #BUTTON_TEXT12>.ladi-headline {
              font-family: SWZXItQmsZCdGY;
              font-weight: bold;
              line-height: 1.6;
              color: rgb(255, 255, 255);
              text-align: center;
            }

            #GROUP5,
            #GROUP19,
            #FRAME20,
            #GROUP15,
            #GROUP14,
            #FRAME8,
            #FRAME9,
            #FRAME54,
            #FRAME55,
            #FRAME56,
            #FRAME57,
            #FRAME58,
            #FRAME59 {
              width: auto !important;
              height: auto !important;
            }

            #GROUP5>.ladi-frame,
            #GROUP19>.ladi-frame,
            #FRAME20>.ladi-frame,
            #GROUP15>.ladi-frame,
            #GROUP14>.ladi-frame,
            #FRAME8>.ladi-frame,
            #FRAME9>.ladi-frame,
            #FRAME54>.ladi-frame,
            #FRAME55>.ladi-frame,
            #FRAME56>.ladi-frame,
            #FRAME57>.ladi-frame,
            #FRAME58>.ladi-frame,
            #FRAME59>.ladi-frame {
              width: max-content;
              height: max-content;
            }

            #GROUP5>.ladi-frame,
            #IMAGE1>.ladi-image>.ladi-image-background,
            #IMAGE4>.ladi-image>.ladi-image-background,
            #IMAGE37>.ladi-image>.ladi-image-background,
            #IMAGE38>.ladi-image>.ladi-image-background,
            #GROUP19>.ladi-frame,
            #IMAGE19>.ladi-image>.ladi-image-background,
            #FRAME20>.ladi-frame,
            #GROUP15>.ladi-frame,
            #IMAGE8>.ladi-image>.ladi-image-background,
            #GROUP14>.ladi-frame,
            #FRAME8>.ladi-frame,
            #IMAGE14>.ladi-image>.ladi-image-background,
            #FRAME9>.ladi-frame,
            #IMAGE23,
            #IMAGE23>.ladi-image>.ladi-image-background,
            #IMAGE24>.ladi-image>.ladi-image-background,
            #IMAGE25>.ladi-image>.ladi-image-background,
            #IMAGE27>.ladi-image>.ladi-image-background,
            #IMAGE31>.ladi-image>.ladi-image-background,
            #IMAGE45,
            #IMAGE45>.ladi-image>.ladi-image-background,
            #IMAGE46,
            #FRAME54>.ladi-frame,
            #FRAME55>.ladi-frame,
            #FRAME56>.ladi-frame,
            #FRAME57>.ladi-frame,
            #FRAME58>.ladi-frame,
            #FRAME59>.ladi-frame,
            #ACCORDION_MENU51,
            #ACCORDION_MENU49,
            #ACCORDION_MENU53,
            #IMAGE39,
            #IMAGE39>.ladi-image>.ladi-image-background,
            #IMAGE40,
            #IMAGE40>.ladi-image>.ladi-image-background,
            #BUTTON22,
            #BUTTON18,
            #GROUP51,
            #BOX9,
            #IMAGE41,
            #BUTTON25,
            #GROUP60,
            #BOX14,
            #IMAGE47,
            #BUTTON26,
            #GROUP62,
            #BOX15,
            #IMAGE48,
            #BUTTON27,
            #ACCORDION_MENU40,
            #ACCORDION_MENU46,
            #ACCORDION_MENU44,
            #ACCORDION_MENU38,
            #ACCORDION_MENU42,
            #IMAGE28>.ladi-image>.ladi-image-background,
            #SHAPE22,
            #SHAPE23,
            #IMAGE29,
            #IMAGE29>.ladi-image>.ladi-image-background,
            #SHAPE34,
            #SHAPE35,
            #SHAPE24,
            #IMAGE30>.ladi-image>.ladi-image-background,
            #SHAPE36,
            #POPUP28,
            #POPUP_MENU_MOBILE_MENU1 {
              top: 0px;
              left: 0px;
            }

            #GROUP5>.ladi-frame {
              position: relative;
              display: inline-flex;
              flex-direction: row;
              gap: 24px;
              padding: 0px;
              margin: 0px auto auto 0px;
              overflow: initial;
            }

            #GROUP5>.ladi-frame>.ladi-element {
              position: relative;
              right: 0px;
              bottom: 0px;
              display: inline-block;
              vertical-align: top;
              margin: 0px auto auto 0px;
            }

            #IMAGE1,
            #IMAGE4,
            #IMAGE19,
            #FRAME20,
            #HEADLINE37,
            #HEADLINE38,
            #IMAGE8,
            #GROUP14,
            #HEADLINE23,
            #HEADLINE24,
            #IMAGE14,
            #FRAME9,
            #HEADLINE27,
            #HEADLINE28,
            #IMAGE42,
            #FRAME55,
            #HEADLINE81,
            #HEADLINE82,
            #IMAGE43,
            #FRAME57,
            #HEADLINE83,
            #HEADLINE84,
            #IMAGE44,
            #FRAME59,
            #HEADLINE85,
            #HEADLINE86 {
              top: 0px !important;
              left: 0px !important;
            }

            #IMAGE1,
            #IMAGE4 {
              order: 11;
            }

            #IMAGE1>.ladi-image>.ladi-image-background,
            #IMAGE37>.ladi-image>.ladi-image-background,
            #IMAGE29>.ladi-image>.ladi-image-background {
              background-image: url("https://w.ladicdn.com/6684efaadbba9e0011a029ed/cflogo-20240910185308-hdz70.svg");
            }

            #HERO>.ladi-overlay {
              opacity: 0.95;
              mix-blend-mode: multiply;
              will-change: transform, opacity;
            }

            #HERO>.ladi-section-background {
              background-size: 100%;
              background-origin: content-box;
              background-position: 50% 50%;
              background-repeat: repeat;
              background-attachment: scroll;
            }

            #BUTTON8>.ladi-button {
              border-width: 1px;
              border-radius: 100px;
              border-color: rgb(255, 255, 255);
            }

            #BUTTON_TEXT8>.ladi-headline {
              font-size: 14px;
              font-weight: bold;
              line-height: 1.6;
              color: rgb(39, 39, 39);
              text-align: center;
            }

            #HEADLINE11>.ladi-headline {
              line-height: 1.8;
              color: rgb(255, 255, 255);
            }

            #HEADLINE12>.ladi-headline {
              font-weight: bold;
              line-height: 1.2;
              color: rgb(255, 255, 255);
              letter-spacing: 0px;
            }

            #HEADLINE77>.ladi-headline {
              font-weight: bold;
              line-height: 1.6;
              color: rgb(39, 39, 39);
            }

            #HEADLINE19>.ladi-headline,
            #HEADLINE40>.ladi-headline {
              font-family: SWZXItQmsZCdGY;
              font-weight: bold;
              line-height: 1.2;
              color: rgb(39, 39, 39);
              text-align: left;
            }

            #PARAGRAPH5>.ladi-paragraph {
              font-family: SWZXItUmVndWxhcidGY;
              font-size: 14px;
              line-height: 1.6;
              color: rgb(39, 39, 39);
            }

            #GROUP19>.ladi-frame,
            #FRAME54>.ladi-frame,
            #FRAME56>.ladi-frame,
            #FRAME58>.ladi-frame {
              position: relative;
              display: inline-flex;
              flex-direction: column;
              gap: 20px;
              padding: 0px;
              margin: 0px auto auto 0px;
              overflow: initial;
            }

            #GROUP19>.ladi-frame>.ladi-element,
            #FRAME20>.ladi-frame>.ladi-element,
            #GROUP15>.ladi-frame>.ladi-element,
            #GROUP14>.ladi-frame>.ladi-element,
            #FRAME8>.ladi-frame>.ladi-element,
            #FRAME9>.ladi-frame>.ladi-element,
            #FRAME54>.ladi-frame>.ladi-element,
            #FRAME55>.ladi-frame>.ladi-element,
            #FRAME56>.ladi-frame>.ladi-element,
            #FRAME57>.ladi-frame>.ladi-element,
            #FRAME58>.ladi-frame>.ladi-element,
            #FRAME59>.ladi-frame>.ladi-element {
              position: relative;
              right: 0px;
              bottom: 0px;
              margin: 0px auto auto 0px;
            }

            #IMAGE19,
            #IMAGE19>.ladi-image>.ladi-image-background,
            #IMAGE8,
            #IMAGE8>.ladi-image>.ladi-image-background,
            #IMAGE14,
            #IMAGE14>.ladi-image>.ladi-image-background,
            #IMAGE42,
            #IMAGE43,
            #IMAGE44 {
              width: 400px;
              height: 481.437px;
            }

            #IMAGE19>.ladi-image>.ladi-image-background {
              background-image: url("https://w.ladicdn.com/s750x800/6684efaadbba9e0011a029ed/hkuukqdy20240911063137.jpg");
            }

            #FRAME20>.ladi-frame,
            #FRAME9>.ladi-frame,
            #FRAME55>.ladi-frame,
            #FRAME57>.ladi-frame,
            #FRAME59>.ladi-frame {
              position: relative;
              display: inline-flex;
              flex-direction: column;
              gap: 20px;
              padding: 0px 20px 0px 24px;
              margin: 0px auto auto 0px;
              overflow: initial;
            }

            #HEADLINE37,
            #HEADLINE23,
            #HEADLINE27,
            #HEADLINE81,
            #HEADLINE83,
            #HEADLINE85 {
              width: 356px;
            }

            #HEADLINE37>.ladi-headline,
            #HEADLINE23>.ladi-headline,
            #HEADLINE27>.ladi-headline,
            #HEADLINE64>.ladi-headline,
            #HEADLINE67>.ladi-headline,
            #HEADLINE70>.ladi-headline,
            #HEADLINE74>.ladi-headline,
            #HEADLINE81>.ladi-headline,
            #HEADLINE83>.ladi-headline,
            #HEADLINE85>.ladi-headline {
              font-size: 18px;
              font-weight: bold;
              line-height: 1.6;
              color: rgb(0, 0, 0);
              text-align: left;
            }

            #HEADLINE38,
            #HEADLINE24,
            #HEADLINE28,
            #HEADLINE82,
            #HEADLINE84 {
              width: 346px;
            }

            #HEADLINE38>.ladi-headline,
            #HEADLINE82>.ladi-headline,
            #HEADLINE84>.ladi-headline,
            #HEADLINE86>.ladi-headline {
              font-size: 15px;
              line-height: 1.6;
              color: rgb(0, 0, 0);
            }

            #GROUP15>.ladi-frame,
            #FRAME8>.ladi-frame {
              position: relative;
              display: inline-flex;
              flex-direction: column;
              gap: 23px;
              padding: 0px;
              margin: 0px auto auto 0px;
              overflow: initial;
            }

            #IMAGE8>.ladi-image>.ladi-image-background {
              background-image: url("https://w.ladicdn.com/s750x800/6684efaadbba9e0011a029ed/w6p-wlhi20240911072853.jpg");
            }

            #GROUP14>.ladi-frame {
              position: relative;
              display: inline-flex;
              flex-direction: column;
              gap: 20px;
              padding: 0px 20px 1.003px 24px;
              margin: 0px auto auto 0px;
              overflow: initial;
            }

            #HEADLINE24>.ladi-headline,
            #HEADLINE28>.ladi-headline {
              font-size: 15px;
              line-height: 1.6;
              color: rgb(0, 0, 0);
              text-align: left;
            }

            #IMAGE14>.ladi-image>.ladi-image-background {
              background-image: url("https://w.ladicdn.com/s750x800/6684efaadbba9e0011a029ed/zggu3toy20240911072931.jpg");
            }

            #BUTTON13,
            #BUTTON11,
            #BUTTON23,
            #BUTTON24 {
              width: 212.661px;
              height: 54px;
            }

            #BUTTON_TEXT13,
            #BUTTON_TEXT11,
            #BUTTON_TEXT23,
            #BUTTON_TEXT12,
            #BUTTON_TEXT24 {
              width: 213px;
            }

            #BUTTON_TEXT13>.ladi-headline,
            #BUTTON_TEXT11>.ladi-headline,
            #BUTTON_TEXT23>.ladi-headline,
            #BUTTON_TEXT24>.ladi-headline {
              font-family: SWZXItQmsZCdGY;
              font-size: 17px;
              font-weight: bold;
              line-height: 1.6;
              color: rgb(255, 255, 255);
              text-align: center;
            }

            #HEADLINE39>.ladi-headline {
              font-family: SWZXItQmsZCdGY;
              font-size: 40px;
              font-weight: bold;
              line-height: 1.2;
              color: rgb(38, 38, 38);
              text-align: left;
            }

            #PARAGRAPH9>.ladi-paragraph {
              font-family: SWZXItUmVndWxhcidGY;
              line-height: 1.6;
              color: rgb(38, 38, 38);
              text-align: justify;
            }

            #GROUP55 {
              width: 286px;
              height: 402.824px;
            }

            #IMAGE23,
            #IMAGE23>.ladi-image>.ladi-image-background,
            #IMAGE45,
            #IMAGE45>.ladi-image>.ladi-image-background,
            #IMAGE46 {
              width: 286px;
              height: 286px;
            }

            #IMAGE23>.ladi-image>.ladi-image-background,
            #IMAGE39>.ladi-image>.ladi-image-background {
              background-image: url("https://w.ladicdn.com/s600x600/6684efaadbba9e0011a029ed/photo_2024-09-12_19-51-12-20240915170145-yzh-i.jpg");
            }

            #PARAGRAPH21,
            #PARAGRAPH59,
            #PARAGRAPH60 {
              width: 286px;
              top: 312.824px;
              left: 0px;
            }

            #PARAGRAPH21>.ladi-paragraph,
            #PARAGRAPH59>.ladi-paragraph,
            #PARAGRAPH60>.ladi-paragraph {
              font-family: SWZXItUmVndWxhcidGY;
              font-size: 17px;
              line-height: 1.6;
              color: rgb(38, 38, 38);
              text-align: center;
            }

            #IMAGE24,
            #IMAGE24>.ladi-image>.ladi-image-background,
            #IMAGE25,
            #IMAGE25>.ladi-image>.ladi-image-background,
            #IMAGE27,
            #IMAGE27>.ladi-image>.ladi-image-background,
            #IMAGE31,
            #IMAGE31>.ladi-image>.ladi-image-background {
              width: 44px;
              height: 44px;
            }

            #IMAGE24>.ladi-image>.ladi-image-background {
              background-image: url("https://w.ladicdn.com/6684efaadbba9e0011a029ed/image-2-20240915171542-p3-ga.svg");
            }

            #IMAGE25>.ladi-image>.ladi-image-background {
              background-image: url("https://w.ladicdn.com/6684efaadbba9e0011a029ed/image-3-20240915171542-tli4n.svg");
            }

            #IMAGE27>.ladi-image>.ladi-image-background {
              background-image: url("https://w.ladicdn.com/6684efaadbba9e0011a029ed/image-1-20240915171543-jnzhc.svg");
            }

            #HEADLINE65>.ladi-headline,
            #HEADLINE66>.ladi-headline,
            #HEADLINE72>.ladi-headline,
            #HEADLINE73>.ladi-headline,
            #PARAGRAPH27>.ladi-paragraph,
            #PARAGRAPH28>.ladi-paragraph {
              font-size: 14px;
              line-height: 1.6;
              color: rgb(0, 0, 0);
              text-align: justify;
            }

            #HEADLINE70 {
              width: 200px;
            }

            #IMAGE31>.ladi-image>.ladi-image-background {
              background-image: url("https://w.ladicdn.com/6684efaadbba9e0011a029ed/image-20240915171543-vtje1.svg");
            }

            #GROUP56,
            #GROUP57 {
              width: 286px;
              height: 429.824px;
            }

            #IMAGE45>.ladi-image>.ladi-image-background {
              background-image: url("https://w.ladicdn.com/s600x600/6684efaadbba9e0011a029ed/304881622_753034432430025_5326894651603030895_n-biz-kaito-20241001063019-cpx8h.jpg");
            }

            #IMAGE46>.ladi-image>.ladi-image-background {
              width: 290.541px;
              height: 387px;
              top: -47px;
              left: -3px;
              background-image: url("https://w.ladicdn.com/s600x700/6684efaadbba9e0011a029ed/image-_3_-_1_-1-20241001063559-wuu-8.jpg");
            }

            #HEADLINE92>.ladi-headline {
              font-family: SWZXItQmsZCdGY;
              font-weight: bold;
              line-height: 1.2;
              color: rgb(38, 38, 38);
              text-align: left;
            }

            #PARAGRAPH29>.ladi-paragraph {
              font-family: SWZXItUmVndWxhcidGY;
              font-size: 14px;
              line-height: 1.6;
              color: rgb(39, 39, 39);
              text-align: justify;
            }

            #PARAGRAPH49>.ladi-paragraph {
              font-family: SWZXItUmVndWxhcidGY;
              font-weight: bold;
              line-height: 1.6;
              color: rgb(39, 39, 39);
            }

            #IMAGE42>.ladi-image>.ladi-image-background,
            #IMAGE43>.ladi-image>.ladi-image-background,
            #IMAGE44>.ladi-image>.ladi-image-background {
              height: 481.437px;
            }

            #IMAGE42>.ladi-image>.ladi-image-background,
            #IMAGE43>.ladi-image>.ladi-image-background,
            #IMAGE44>.ladi-image>.ladi-image-background,
            #PARAGRAPH72 {
              top: 0px;
            }

            #GROUP63,
            #GROUP64,
            #GROUP65 {
              width: 360px;
              height: 141.96px;
            }

            #PARAGRAPH67,
            #PARAGRAPH70,
            #PARAGRAPH72 {
              width: 351px;
            }

            #PARAGRAPH67,
            #PARAGRAPH70 {
              top: 0px;
              left: 4.5px;
            }

            #PARAGRAPH67>.ladi-paragraph,
            #PARAGRAPH70>.ladi-paragraph,
            #PARAGRAPH72>.ladi-paragraph {
              font-family: SWZXItUmVndWxhcidGY;
              font-size: 20px;
              font-weight: bold;
              line-height: 1.6;
              color: rgb(39, 39, 39);
              text-align: left;
            }

            #PARAGRAPH68,
            #PARAGRAPH71,
            #PARAGRAPH73 {
              width: 360px;
              top: 45.96px;
              left: 0px;
            }

            #PARAGRAPH68>.ladi-paragraph,
            #PARAGRAPH71>.ladi-paragraph,
            #PARAGRAPH73>.ladi-paragraph {
              font-size: 20px;
              line-height: 1.6;
              color: rgb(0, 0, 0);
            }

            #ACCORDION13,
            #ACCORDION_CONTENT50,
            #ACCORDION12,
            #ACCORDION_CONTENT48,
            #ACCORDION14,
            #ACCORDION_CONTENT52,
            #GROUP29,
            #GROUP38,
            #GROUP39 {
              left: 0px;
            }

            #ACCORDION_CONTENT50,
            #ACCORDION_CONTENT48,
            #ACCORDION_CONTENT52,
            #ACCORDION_CONTENT39,
            #ACCORDION_CONTENT45,
            #ACCORDION_CONTENT43,
            #ACCORDION_CONTENT37,
            #ACCORDION_CONTENT41 {
              display: none !important;
            }

            #ACCORDION_CONTENT50>.ladi-frame-bg>.ladi-frame-background,
            #ACCORDION_MENU51>.ladi-frame-bg>.ladi-frame-background,
            #ACCORDION_CONTENT48>.ladi-frame-bg>.ladi-frame-background,
            #ACCORDION_MENU49>.ladi-frame-bg>.ladi-frame-background,
            #ACCORDION_CONTENT52>.ladi-frame-bg>.ladi-frame-background,
            #ACCORDION_MENU53>.ladi-frame-bg>.ladi-frame-background,
            #BOX9>.ladi-box,
            #BOX14>.ladi-box,
            #BOX15>.ladi-box,
            #ACCORDION_CONTENT39>.ladi-frame-bg>.ladi-frame-background,
            #ACCORDION_MENU40>.ladi-frame-bg>.ladi-frame-background,
            #ACCORDION_CONTENT45>.ladi-frame-bg>.ladi-frame-background,
            #ACCORDION_MENU46>.ladi-frame-bg>.ladi-frame-background,
            #ACCORDION_CONTENT43>.ladi-frame-bg>.ladi-frame-background,
            #ACCORDION_MENU44>.ladi-frame-bg>.ladi-frame-background,
            #ACCORDION_CONTENT37>.ladi-frame-bg>.ladi-frame-background,
            #ACCORDION_MENU38>.ladi-frame-bg>.ladi-frame-background,
            #ACCORDION_CONTENT41>.ladi-frame-bg>.ladi-frame-background,
            #ACCORDION_MENU42>.ladi-frame-bg>.ladi-frame-background {
              background-color: rgb(241, 243, 244);
            }

            #PARAGRAPH51>.ladi-paragraph,
            #PARAGRAPH50>.ladi-paragraph,
            #PARAGRAPH52>.ladi-paragraph {
              line-height: 1.6;
              color: rgb(0, 0, 0);
            }

            #ACCORDION_SHAPE38 svg:last-child,
            #ACCORDION_SHAPE37 svg:last-child,
            #ACCORDION_SHAPE39 svg:last-child,
            #ACCORDION_SHAPE30 svg:last-child,
            #ACCORDION_SHAPE33 svg:last-child,
            #ACCORDION_SHAPE32 svg:last-child,
            #ACCORDION_SHAPE29 svg:last-child,
            #ACCORDION_SHAPE31 svg:last-child,
            #SHAPE36 svg:last-child {
              fill: rgb(0, 0, 0);
            }

            #HEADLINE79>.ladi-headline,
            #HEADLINE78>.ladi-headline,
            #HEADLINE80>.ladi-headline {
              font-weight: bold;
              line-height: 1.6;
              color: rgb(0, 0, 0);
              text-align: left;
            }

            #PARAGRAPH40>.ladi-paragraph,
            #PARAGRAPH61>.ladi-paragraph {
              font-family: SWZXItQmsZCdGY;
              line-height: 1.6;
              color: rgb(39, 39, 39);
            }

            #GROUP54 {
              width: 278px;
              height: 393px;
            }

            #PARAGRAPH46 {
              width: 277px;
              top: 295.5px;
              left: 0px;
            }

            #PARAGRAPH46>.ladi-paragraph {
              font-size: 22px;
              font-weight: bold;
              line-height: 1.6;
              color: rgb(0, 0, 0);
            }

            #PARAGRAPH47 {
              width: 273px;
              top: 342px;
              left: 0px;
            }

            #PARAGRAPH47>.ladi-paragraph,
            #PARAGRAPH44>.ladi-paragraph,
            #PARAGRAPH41>.ladi-paragraph,
            #PARAGRAPH63>.ladi-paragraph,
            #PARAGRAPH65>.ladi-paragraph {
              font-family: SWZXItUmVndWxhcidGY;
              font-size: 16px;
              line-height: 1.6;
              color: rgb(39, 39, 39);
              text-align: justify;
            }

            #IMAGE39,
            #IMAGE39>.ladi-image>.ladi-image-background,
            #IMAGE40,
            #GROUP51,
            #BOX9,
            #IMAGE41,
            #GROUP60,
            #BOX14,
            #IMAGE47,
            #GROUP62,
            #BOX15,
            #IMAGE48 {
              width: 278px;
              height: 278px;
            }

            #GROUP53 {
              width: 278px;
              height: 393.8px;
            }

            #PARAGRAPH44,
            #PARAGRAPH45,
            #LINE9,
            #LINE7,
            #PARAGRAPH41,
            #PARAGRAPH42,
            #LINE10,
            #PARAGRAPH63,
            #PARAGRAPH64,
            #LINE11,
            #PARAGRAPH65,
            #PARAGRAPH66 {
              width: 278px;
            }

            #PARAGRAPH44 {
              top: 342.8px;
              left: 0px;
            }

            #PARAGRAPH45 {
              top: 294px;
              left: 0px;
            }

            #PARAGRAPH45>.ladi-paragraph,
            #PARAGRAPH42>.ladi-paragraph,
            #PARAGRAPH64>.ladi-paragraph,
            #PARAGRAPH66>.ladi-paragraph {
              font-family: SWZXItUmVndWxhcidGY;
              font-size: 22px;
              font-weight: bold;
              line-height: 1.6;
              color: rgb(39, 39, 39);
              text-align: justify;
            }

            #IMAGE40>.ladi-image>.ladi-image-background {
              width: 278px;
              height: 419.224px;
              background-image: url("https://w.ladicdn.com/s600x750/6684efaadbba9e0011a029ed/profile-card-20240828043244-dzvc1.png");
            }

            #BUTTON_GROUP3,
            #BUTTON22,
            #BUTTON_GROUP4,
            #BUTTON25,
            #BUTTON_GROUP5,
            #BUTTON26,
            #BUTTON_GROUP6,
            #BUTTON27 {
              height: 40px;
            }

            #BUTTON_GROUP3>.ladi-button-group>.ladi-element.selected>.ladi-button .ladi-button-background,
            #BUTTON_GROUP2>.ladi-button-group>.ladi-element.selected>.ladi-button .ladi-button-background,
            #BUTTON_GROUP4>.ladi-button-group>.ladi-element.selected>.ladi-button .ladi-button-background,
            #BUTTON_GROUP5>.ladi-button-group>.ladi-element.selected>.ladi-button .ladi-button-background,
            #BUTTON_GROUP6>.ladi-button-group>.ladi-element.selected>.ladi-button .ladi-button-background {
              background-image: none !important;
              background-color: rgb(0, 0, 0) !important;
              background-size: initial !important;
              background-origin: initial !important;
              background-position: initial !important;
              background-repeat: initial !important;
              background-attachment: initial !important;
              -webkit-background-clip: initial !important;
            }

            #BUTTON_GROUP3>.ladi-button-group>.ladi-element.selected>.ladi-button .ladi-headline,
            #BUTTON_GROUP2>.ladi-button-group>.ladi-element.selected>.ladi-button .ladi-headline,
            #BUTTON_GROUP4>.ladi-button-group>.ladi-element.selected>.ladi-button .ladi-headline,
            #BUTTON_GROUP5>.ladi-button-group>.ladi-element.selected>.ladi-button .ladi-headline,
            #BUTTON_GROUP6>.ladi-button-group>.ladi-element.selected>.ladi-button .ladi-headline {
              color: rgb(255, 255, 255) !important;
            }

            #BUTTON22>.ladi-button,
            #BUTTON18>.ladi-button,
            #BUTTON25>.ladi-button,
            #BUTTON26>.ladi-button,
            #BUTTON27>.ladi-button {
              border-width: 2px;
              border-radius: 100px;
              border-color: rgb(0, 0, 0);
            }

            #BUTTON_TEXT22 {
              width: 99px;
            }

            #BUTTON_TEXT22>.ladi-headline,
            #BUTTON_TEXT18>.ladi-headline,
            #BUTTON_TEXT25>.ladi-headline,
            #BUTTON_TEXT26>.ladi-headline,
            #BUTTON_TEXT27>.ladi-headline {
              font-size: 14px;
              font-weight: bold;
              line-height: 1.6;
              color: rgb(0, 0, 0);
              text-align: center;
            }

            #LINE8>.ladi-line>.ladi-line-container,
            #LINE9>.ladi-line>.ladi-line-container,
            #LINE7>.ladi-line>.ladi-line-container,
            #LINE10>.ladi-line>.ladi-line-container,
            #LINE11>.ladi-line>.ladi-line-container {
              border-top: 1px solid rgb(0, 0, 0);
              border-right: 1px solid rgb(0, 0, 0);
              border-bottom: 1px solid rgb(0, 0, 0);
              border-left: 0px !important;
            }

            #LINE8>.ladi-line,
            #LINE9>.ladi-line,
            #LINE7>.ladi-line,
            #LINE10>.ladi-line,
            #LINE11>.ladi-line {
              width: 100%;
              padding: 8px 0px;
            }

            #GROUP58,
            #GROUP59,
            #GROUP61 {
              width: 278px;
              height: 478.778px;
            }

            #LINE7,
            #LINE10,
            #LINE11 {
              top: 407.778px;
              left: 0px;
            }

            #BUTTON_GROUP2,
            #BUTTON18 {
              width: 48px;
              height: 40px;
            }

            #BUTTON_GROUP2,
            #BUTTON_GROUP4,
            #BUTTON_GROUP5 {
              top: 438.778px;
              left: 0px;
            }

            #BUTTON_TEXT18 {
              width: 48px;
            }

            #PARAGRAPH41,
            #PARAGRAPH63,
            #PARAGRAPH65 {
              top: 342.5px;
              left: 0px;
            }

            #PARAGRAPH42,
            #PARAGRAPH64,
            #PARAGRAPH66 {
              top: 297.5px;
              left: 0px;
            }

            #BOX9>.ladi-box,
            #BOX14>.ladi-box,
            #BOX15>.ladi-box {
              border-radius: 0px;
            }

            #IMAGE41>.ladi-image>.ladi-image-background {
              width: 391.721px;
              height: 335.378px;
              top: -9.5632px;
              left: -49.0948px;
              background-image: url("https://w.ladicdn.com/s700x650/6684efaadbba9e0011a029ed/mr-pham-huong-founder-ceo-gfi-2048x1750-removebg-preview-1-20240729040317-9baxw.png");
            }

            #IMAGE47>.ladi-image>.ladi-image-background {
              width: 391.721px;
              height: 587.467px;
              top: -54.5632px;
              left: -55.0948px;
              background-image: url("https://w.ladicdn.com/s700x900/6684efaadbba9e0011a029ed/image_667866162_20241001030309-20241001070325-hiwoc.png");
            }

            #IMAGE48>.ladi-image>.ladi-image-background {
              width: 391.721px;
              height: 391.721px;
              top: -31.5632px;
              left: -69.0948px;
              background-image: url("https://w.ladicdn.com/s700x700/6684efaadbba9e0011a029ed/tuong-1-20241001070420-g5_ct.png");
            }

            #HEADLINE41>.ladi-headline {
              font-family: SWZXItQmsZCdGY;
              font-weight: bold;
              line-height: 1.2;
              color: rgb(39, 39, 39);
              text-align: center;
            }

            #ACCORDION_CONTENT39,
            #ACCORDION_CONTENT45,
            #ACCORDION_CONTENT43,
            #ACCORDION_CONTENT37,
            #ACCORDION_CONTENT41 {
              top: 51px;
              left: 0px;
            }

            #PARAGRAPH23,
            #PARAGRAPH26,
            #PARAGRAPH25,
            #PARAGRAPH22,
            #PARAGRAPH24 {
              top: 19px;
              left: 14.25px;
            }

            #PARAGRAPH23>.ladi-paragraph,
            #PARAGRAPH26>.ladi-paragraph,
            #PARAGRAPH25>.ladi-paragraph,
            #PARAGRAPH22>.ladi-paragraph,
            #PARAGRAPH24>.ladi-paragraph {
              font-size: 14px;
              line-height: 1.6;
              color: rgb(0, 0, 0);
            }

            #ACCORDION_SHAPE30>.ladi-shape,
            #ACCORDION_SHAPE33>.ladi-shape,
            #ACCORDION_SHAPE32>.ladi-shape,
            #ACCORDION_SHAPE29>.ladi-shape,
            #ACCORDION_SHAPE31>.ladi-shape {
              width: 18px;
              height: 18px;
            }

            #HEADLINE60 {
              left: 16px;
            }

            #HEADLINE60>.ladi-headline,
            #HEADLINE63>.ladi-headline,
            #HEADLINE62>.ladi-headline,
            #HEADLINE59>.ladi-headline,
            #HEADLINE61>.ladi-headline {
              font-size: 16px;
              font-weight: bold;
              line-height: 1.6;
              color: rgb(0, 0, 0);
              text-align: left;
            }

            #ACCORDION11,
            #ACCORDION_MENU46,
            #ACCORDION10,
            #ACCORDION_MENU44,
            #ACCORDION7,
            #ACCORDION_MENU38,
            #ACCORDION9,
            #ACCORDION_MENU42 {
              height: 41px;
            }

            #ACCORDION_SHAPE33,
            #ACCORDION_SHAPE33>.ladi-shape,
            #ACCORDION_SHAPE32,
            #ACCORDION_SHAPE32>.ladi-shape,
            #ACCORDION_SHAPE29,
            #ACCORDION_SHAPE29>.ladi-shape,
            #ACCORDION_SHAPE31,
            #ACCORDION_SHAPE31>.ladi-shape {
              top: 11.5px;
            }

            #HEADLINE63,
            #HEADLINE62,
            #HEADLINE59,
            #HEADLINE61 {
              top: 8px;
              left: 16px;
            }

            #FOOTER>.ladi-overlay {
              background-image: linear-gradient(-90deg, rgb(255, 255, 255), rgba(255, 255, 255, 0.9));
              background-color: initial;
              background-size: initial;
              background-origin: initial;
              background-position: initial;
              background-repeat: initial;
              background-attachment: initial;
              -webkit-background-clip: initial;
            }

            #FOOTER>.ladi-section-background {
              background-size: cover;
              background-origin: content-box;
              background-position: 50% 0%;
              background-repeat: repeat;
              background-attachment: scroll;
            }

            #HEADLINE45 {
              top: 70.9765px;
              left: 0.0002px;
            }

            #HEADLINE45>.ladi-headline {
              font-size: 14px;
              line-height: 1.4;
              color: rgb(39, 39, 39);
              text-align: justify;
            }

            #IMAGE28,
            #IMAGE28>.ladi-image>.ladi-image-background {
              width: 114.839px;
              height: 59.3333px;
            }

            #IMAGE28 {
              top: 0px;
              left: 0.0002px;
            }

            #IMAGE28>.ladi-image>.ladi-image-background {
              background-image: url("https://w.ladicdn.com/s450x400/6684efaadbba9e0011a029ed/logo-vbi-04-20240910185812-uigds.png");
            }

            #GROUP29,
            #GROUP38 {
              width: 243.65px;
              height: 22.6801px;
            }

            #HEADLINE51,
            #HEADLINE52,
            #HEADLINE75,
            #HEADLINE76 {
              width: 211px;
            }

            #HEADLINE51,
            #HEADLINE75 {
              top: 0px;
              left: 32.65px;
            }

            #HEADLINE51>.ladi-headline,
            #HEADLINE52>.ladi-headline,
            #HEADLINE75>.ladi-headline,
            #HEADLINE76>.ladi-headline,
            #HEADLINE53>.ladi-headline,
            #HEADLINE54>.ladi-headline {
              font-size: 14px;
              line-height: 1.4;
              color: rgb(39, 39, 39);
              text-align: left;
            }

            #SHAPE22,
            #SHAPE34 {
              width: 22.6801px;
              height: 22.6801px;
            }

            #SHAPE22 svg:last-child,
            #SHAPE23 svg:last-child,
            #SHAPE34 svg:last-child,
            #SHAPE35 svg:last-child,
            #SHAPE24 svg:last-child {
              fill: rgb(39, 39, 39);
            }

            #GROUP36,
            #GROUP39 {
              width: 242.65px;
              height: 20px;
            }

            #GROUP36 {
              left: 0.5px;
            }

            #HEADLINE52,
            #HEADLINE76 {
              top: 0px;
              left: 31.65px;
            }

            #SHAPE23,
            #SHAPE35 {
              width: 18.4385px;
              height: 18.4658px;
            }

            #IMAGE29,
            #IMAGE29>.ladi-image>.ladi-image-background {
              width: 174.18px;
              height: 48.3333px;
            }

            #PARAGRAPH27 {
              top: 62.4765px;
              left: 0px;
            }

            #GROUP43 {
              height: 206.689px;
            }

            #GROUP31 {
              width: 251.693px;
              height: 20px;
              top: 186.689px;
              left: 0.002px;
            }

            #HEADLINE53 {
              width: 216px;
              top: 0px;
              left: 35.6932px;
            }

            #SHAPE24 {
              width: 20px;
              height: 20px;
            }

            #GROUP37 {
              height: 20px;
              top: 150.046px;
              left: 0.002px;
            }

            #IMAGE30 {
              width: 21.0526px;
              height: 16px;
              top: 2px;
              left: 0px;
            }

            #IMAGE30>.ladi-image>.ladi-image-background {
              width: 21.056px;
              height: 16px;
              background-image: url("https://w.ladicdn.com/s350x350/6684efaadbba9e0011a029ed/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_rgb-20240919031315-lbus6.png");
            }

            #HEADLINE54 {
              top: 0px;
              left: 34.65px;
            }

            #PARAGRAPH28 {
              top: 58.0607px;
              left: 0px;
            }

            #GROUP40 {
              width: 272px;
              height: 39.5px;
              top: 0px;
              left: 0.002px;
            }

            #HEADLINE50 {
              width: 220px;
              top: 6.75px;
              left: 52px;
            }

            #HEADLINE50>.ladi-headline {
              font-size: 22px;
              font-weight: bold;
              line-height: 1.2;
              color: rgb(39, 39, 39);
              text-align: left;
            }

            #SHAPE36 {
              width: 39.5px;
              height: 39.5px;
            }

            #POPUP28 {
              width: 531.3px;
              height: 459px;
            }

            #POPUP28,
            #POPUP_MENU_MOBILE_MENU1 {
              right: 0px;
              bottom: 0px;
              margin: auto;
            }

            #HEADLINE87,
            #HEADLINE91 {
              width: 449px;
            }

            #HEADLINE87 {
              top: 47.5px;
              left: 42.646px;
            }

            #HEADLINE87>.ladi-headline {
              font-size: 23px;
              font-weight: bold;
              line-height: 1.6;
              color: rgb(0, 0, 0);
              text-align: center;
            }

            #COUNTDOWN1 {
              width: 320px;
              height: 57px;
              top: 136.5px;
              left: 145.146px;
            }

            #COUNTDOWN1>.ladi-countdown {
              font-size: 40px;
              font-weight: bold;
              color: rgb(0, 0, 0);
              text-align: center;
            }

            #COUNTDOWN1>.ladi-countdown>.ladi-element {
              width: calc(25% - 7.5px);
              height: 100%;
              margin-right: 10px;
            }

            #COUNTDOWN_ITEM4 {
              visibility: hidden;
              pointer-events: none;
            }

            #HEADLINE88,
            #HEADLINE89,
            #HEADLINE90 {
              width: 63px;
            }

            #HEADLINE88 {
              top: 193.5px;
              left: 148.146px;
            }

            #HEADLINE88>.ladi-headline,
            #HEADLINE89>.ladi-headline,
            #HEADLINE90>.ladi-headline {
              font-size: 16px;
              font-weight: bold;
              line-height: 1.6;
              color: rgb(0, 0, 0);
              text-align: center;
            }

            #HEADLINE89 {
              top: 193.5px;
              left: 229.15px;
            }

            #HEADLINE90 {
              top: 193.5px;
              left: 313.146px;
            }

            #HEADLINE91 {
              top: 276px;
              left: 36.15px;
            }

            #HEADLINE91>.ladi-headline {
              font-size: 21px;
              font-weight: bold;
              line-height: 1.6;
              color: rgb(0, 0, 0);
              text-align: center;
            }

            #BUTTON24 {
              top: 364.5px;
              left: 160.815px;
            }

            #POPUP_MENU_MOBILE_MENU1 {
              width: 320px;
            }

            #MENU42 {
              width: 110px;
              height: 331px;
              top: 10px;
              left: 105px;
            }

            #MENU42>.ladi-menu .ladi-menu-item {
              font-size: 18px;
              line-height: 1.6;
              color: rgb(255, 255, 255);
            }

            #MENU42>.ladi-menu .ladi-menu-item:hover,
            #MENU42>.ladi-menu .ladi-menu-item.selected {
              color: blue;
            }

            #MENU42>.ladi-menu.list-menu-items {
              gap: 30px;
            }

            #MENU42>.ladi-menu.menu-icon-item {
              background-color: rgb(255, 87, 87);
            }

            @media (min-width: 768px) {
              #HEADER {
                height: 103.067px;
              }

              #MENU1 {
                width: 552px;
                height: 70px;
                top: 11.5333px;
                left: 372.427px;
              }

              #BUTTON3,
              #BUTTON12 {
                width: 212.661px;
                height: 54px;
              }

              #BUTTON3 {
                top: 21.4215px;
                left: 959.427px;
              }

              #BUTTON_TEXT3 {
                width: 213px;
              }

              #BUTTON_TEXT3>.ladi-headline,
              #BUTTON_TEXT12>.ladi-headline {
                font-size: 17px;
              }

              #GROUP5 {
                top: 21.4215px;
                left: 24px;
              }

              #IMAGE1,
              #IMAGE1>.ladi-image>.ladi-image-background {
                width: 182px;
                height: 45.5677px;
              }

              #IMAGE4,
              #IMAGE4>.ladi-image>.ladi-image-background {
                width: 103.542px;
                height: 50.2236px;
              }

              #IMAGE4>.ladi-image>.ladi-image-background {
                background-image: url("https://w.ladicdn.com/s450x400/6684efaadbba9e0011a029ed/logo-vbi-04-20240910185812-uigds.png");
              }

              #HERO {
                height: 673.65px;
              }

              #HERO>.ladi-section-background {
                background-image: url("https://w.ladicdn.com/s1440x673/6684efaadbba9e0011a029ed/ob3v9sm020240911045300.jpg");
              }

              #BUTTON8 {
                width: 218px;
                height: 51px;
                top: 529.8px;
                left: 24px;
              }

              #BUTTON_TEXT8 {
                width: 218px;
              }

              #HEADLINE11 {
                width: 785px;
                top: 388.4px;
                left: 24px;
              }

              #HEADLINE11>.ladi-headline {
                font-size: 18px;
                text-align: justify;
              }

              #HEADLINE12 {
                width: 938px;
                top: 59px;
                left: 24px;
              }

              #HEADLINE12>.ladi-headline {
                font-size: 51px;
              }

              #SECTION16 {
                height: 161.9px;
              }

              #HEADLINE77,
              #HEADLINE45 {
                width: 251px;
              }

              #HEADLINE77 {
                top: 56.9502px;
                left: 180px;
              }

              #HEADLINE77>.ladi-headline {
                font-size: 30px;
              }

              #IMAGE37,
              #IMAGE37>.ladi-image>.ladi-image-background {
                width: 297.383px;
                height: 74.4565px;
              }

              #IMAGE37 {
                top: 43.722px;
                left: 708.523px;
              }

              #IMAGE38,
              #IMAGE38>.ladi-image>.ladi-image-background {
                width: 175.699px;
                height: 85.224px;
              }

              #IMAGE38 {
                top: 38.3382px;
                left: 475.229px;
              }

              #IMAGE38>.ladi-image>.ladi-image-background {
                background-image: url("https://w.ladicdn.com/s500x400/6684efaadbba9e0011a029ed/logo-vbi-04-20240910185812-uigds.png");
              }

              #ROADMAP {
                height: 1087.92px;
              }

              #GROUP12 {
                width: auto !important;
                height: auto !important;
                top: 96px;
                left: 0px;
              }

              #GROUP12>.ladi-frame {
                width: max-content;
                height: max-content;
                top: 0px;
                left: 0px;
                position: relative;
                display: inline-flex;
                flex-direction: column;
                gap: 20px;
                padding: 0px 24px;
                margin: 0px auto auto 0px;
                overflow: initial;
              }

              #GROUP12>.ladi-frame>.ladi-element {
                position: relative;
                right: 0px;
                bottom: 0px;
                margin: 0px auto auto 0px;
              }

              #HEADLINE19 {
                width: 750px;
              }

              #HEADLINE19,
              #PARAGRAPH5 {
                top: 0px !important;
                left: 0px !important;
              }

              #HEADLINE19>.ladi-headline,
              #HEADLINE40>.ladi-headline,
              #HEADLINE41>.ladi-headline {
                font-size: 40px;
              }

              #PARAGRAPH5 {
                width: 789px;
              }

              #PARAGRAPH5>.ladi-paragraph,
              #HEADLINE38>.ladi-headline,
              #HEADLINE82>.ladi-headline,
              #HEADLINE84>.ladi-headline,
              #HEADLINE86>.ladi-headline {
                text-align: justify;
              }

              #GROUP19 {
                top: 270.8px;
                left: 0px;
              }

              #GROUP15 {
                top: 270.315px;
                left: 400px;
              }

              #FRAME8 {
                top: 270.8px;
                left: 800px;
              }

              #BUTTON13 {
                top: 988.783px;
                left: 493.67px;
              }

              #BOOTCAMP {
                height: 1207.95px;
              }

              #HEADLINE39,
              #HEADLINE92 {
                width: 864px;
              }

              #HEADLINE39 {
                top: 84.5652px;
                left: 24px;
              }

              #PARAGRAPH9 {
                width: 1148px;
                top: 683.389px;
                left: 22px;
              }

              #PARAGRAPH9>.ladi-paragraph,
              #PARAGRAPH51>.ladi-paragraph,
              #PARAGRAPH50>.ladi-paragraph,
              #PARAGRAPH52>.ladi-paragraph {
                font-size: 16px;
              }

              #GROUP55 {
                top: 235.565px;
                left: 22px;
              }

              #IMAGE24 {
                top: 936.395px;
                left: 612.5px;
              }

              #IMAGE25 {
                top: 811.392px;
                left: 612.5px;
              }

              #IMAGE27 {
                top: 811.388px;
                left: 35.5px;
              }

              #BUTTON11 {
                top: 1107.39px;
                left: 491.67px;
              }

              #HEADLINE64,
              #HEADLINE74 {
                width: 336px;
              }

              #HEADLINE64 {
                top: 936.395px;
                left: 673.5px;
              }

              #HEADLINE65,
              #HEADLINE73 {
                width: 493px;
              }

              #HEADLINE65 {
                top: 973.372px;
                left: 673.5px;
              }

              #HEADLINE66,
              #HEADLINE72 {
                width: 425px;
              }

              #HEADLINE66 {
                top: 973.371px;
                left: 102.5px;
              }

              #HEADLINE67 {
                width: 377px;
                top: 936.394px;
                left: 102.5px;
              }

              #HEADLINE70 {
                top: 811.388px;
                left: 102.5px;
              }

              #HEADLINE72 {
                top: 840.388px;
                left: 102.5px;
              }

              #HEADLINE73 {
                top: 840.389px;
                left: 673.5px;
              }

              #HEADLINE74 {
                top: 807.476px;
                left: 673.5px;
              }

              #IMAGE31 {
                top: 936.394px;
                left: 28.5px;
              }

              #GROUP56 {
                top: 235.565px;
                left: 455px;
              }

              #GROUP57 {
                top: 235.565px;
                left: 886px;
              }

              #HEADLINE92 {
                top: 166.963px;
                left: 24px;
              }

              #HEADLINE92>.ladi-headline {
                font-size: 33px;
              }

              #HACKATHON {
                height: 1789.81px;
              }

              #HEADLINE40 {
                width: 916px;
                top: 51px;
                left: 22px;
              }

              #PARAGRAPH29 {
                width: 1156px;
                top: 121px;
                left: 22px;
              }

              #PARAGRAPH49 {
                width: 601px;
                top: 253.677px;
                left: 24px;
              }

              #PARAGRAPH49>.ladi-paragraph {
                font-size: 32px;
                text-align: left;
              }

              #FRAME54 {
                top: 687.828px;
                left: 0px;
              }

              #IMAGE42>.ladi-image>.ladi-image-background,
              #IMAGE43>.ladi-image>.ladi-image-background,
              #IMAGE44>.ladi-image>.ladi-image-background {
                width: 400px;
                left: 0px;
              }

              #IMAGE42>.ladi-image>.ladi-image-background {
                background-image: url("https://w.ladicdn.com/s750x800/6684efaadbba9e0011a029ed/blox-nominatie-1-scaled-20241001064424-a0-tq.jpg");
              }

              #FRAME56 {
                top: 687.828px;
                left: 400px;
              }

              #IMAGE43>.ladi-image>.ladi-image-background {
                background-image: url("https://w.ladicdn.com/s750x800/6684efaadbba9e0011a029ed/download-20241001064021-sctzg.jpg");
              }

              #FRAME58 {
                top: 687.828px;
                left: 800px;
              }

              #IMAGE44>.ladi-image>.ladi-image-background {
                background-image: url("https://w.ladicdn.com/s750x800/6684efaadbba9e0011a029ed/738-scaled-e1595409765862-20241001064046-qw1mz.jpg");
              }

              #HEADLINE86 {
                width: 356px;
              }

              #BUTTON23 {
                top: 1674.01px;
                left: 493.669px;
              }

              #GROUP63 {
                top: 1459.05px;
                left: 20px;
              }

              #GROUP64 {
                top: 1460.03px;
                left: 420px;
              }

              #GROUP65 {
                top: 1460.03px;
                left: 820px;
              }

              #PARAGRAPH72 {
                left: 4.5px;
              }

              #ACCORDION13,
              #ACCORDION_CONTENT50,
              #ACCORDION_MENU51,
              #ACCORDION12,
              #ACCORDION_CONTENT48,
              #ACCORDION_MENU49,
              #ACCORDION14,
              #ACCORDION_CONTENT52,
              #ACCORDION_MENU53 {
                width: 1200px;
                height: 92px;
              }

              #ACCORDION13 {
                top: 433.343px;
              }

              #ACCORDION_CONTENT50,
              #ACCORDION_CONTENT48,
              #ACCORDION_CONTENT52 {
                top: 105px;
              }

              #PARAGRAPH51,
              #PARAGRAPH50,
              #PARAGRAPH52 {
                width: 1155px;
                top: 20.5px;
                left: 22.5px;
              }

              #ACCORDION_SHAPE38,
              #ACCORDION_SHAPE38>.ladi-shape,
              #ACCORDION_SHAPE37,
              #ACCORDION_SHAPE37>.ladi-shape,
              #ACCORDION_SHAPE39,
              #ACCORDION_SHAPE39>.ladi-shape {
                top: 26.5634px;
                left: 1137.72px;
              }

              #ACCORDION_SHAPE38>.ladi-shape,
              #ACCORDION_SHAPE37>.ladi-shape,
              #ACCORDION_SHAPE39>.ladi-shape {
                width: 30px;
                height: 30px;
              }

              #HEADLINE79,
              #HEADLINE78,
              #HEADLINE80 {
                width: 500px;
                top: 26.5634px;
                left: 23.901px;
              }

              #HEADLINE79>.ladi-headline,
              #HEADLINE78>.ladi-headline,
              #HEADLINE80>.ladi-headline {
                font-size: 24px;
              }

              #ACCORDION12 {
                top: 328.343px;
              }

              #ACCORDION14 {
                top: 537.121px;
              }

              #SECTION17 {
                height: 1295.8px;
              }

              #PARAGRAPH40,
              #PARAGRAPH61 {
                width: 624px;
              }

              #PARAGRAPH40 {
                top: 67.53px;
                left: 28.5px;
              }

              #PARAGRAPH40>.ladi-paragraph,
              #PARAGRAPH61>.ladi-paragraph {
                font-size: 40px;
                text-align: justify;
              }

              #GROUP54 {
                top: 158.7px;
                left: 892.5px;
              }

              #GROUP53 {
                top: 158.7px;
                left: 461px;
              }

              #BUTTON_GROUP3,
              #BUTTON22 {
                width: 99px;
              }

              #BUTTON_GROUP3 {
                top: 597.478px;
                left: 461px;
              }

              #LINE8 {
                width: 278px;
                top: 566.478px;
                left: 461px;
              }

              #LINE9 {
                top: 566.478px;
                left: 892.5px;
              }

              #GROUP58 {
                top: 158.7px;
                left: 28.5px;
              }

              #PARAGRAPH61 {
                top: 678.314px;
                left: 28.5px;
              }

              #GROUP59 {
                top: 761.814px;
                left: 28.5px;
              }

              #BUTTON_GROUP4,
              #BUTTON25,
              #BUTTON_TEXT25 {
                width: 103px;
              }

              #GROUP61 {
                top: 761.814px;
                left: 461px;
              }

              #BUTTON_GROUP5,
              #BUTTON26,
              #BUTTON_TEXT26,
              #BUTTON_GROUP6,
              #BUTTON27,
              #BUTTON_TEXT27 {
                width: 107px;
              }

              #BUTTON_GROUP6 {
                top: 1200.59px;
                left: 580.5px;
              }

              #FAQ {
                height: 552px;
              }

              #HEADLINE41 {
                width: 294px;
                top: 39px;
                left: 453px;
              }

              #BUTTON12 {
                top: 459.698px;
                left: 493.67px;
              }

              #ACCORDION8,
              #ACCORDION_MENU40 {
                width: 1053.5px;
                height: 41px;
              }

              #ACCORDION8 {
                top: 185.901px;
                left: 73.25px;
              }

              #ACCORDION_CONTENT39,
              #ACCORDION_CONTENT37 {
                width: 1053.5px;
                height: 61px;
              }

              #PARAGRAPH23,
              #PARAGRAPH26,
              #PARAGRAPH25,
              #PARAGRAPH22,
              #PARAGRAPH24 {
                width: 1017px;
              }

              #ACCORDION_SHAPE30,
              #ACCORDION_SHAPE30>.ladi-shape {
                top: 11.5px;
                left: 1007.25px;
              }

              #HEADLINE60,
              #HEADLINE63,
              #HEADLINE62,
              #HEADLINE59,
              #HEADLINE61 {
                width: 958px;
              }

              #HEADLINE60 {
                top: 8px;
              }

              #ACCORDION11,
              #ACCORDION_MENU46,
              #ACCORDION10,
              #ACCORDION_MENU44,
              #ACCORDION7,
              #ACCORDION_MENU38,
              #ACCORDION9,
              #ACCORDION_MENU42 {
                width: 1053.5px;
              }

              #ACCORDION11 {
                top: 309.268px;
                left: 73.25px;
              }

              #ACCORDION_CONTENT45 {
                width: 1053.5px;
                height: 59px;
              }

              #ACCORDION_SHAPE33,
              #ACCORDION_SHAPE33>.ladi-shape,
              #ACCORDION_SHAPE32,
              #ACCORDION_SHAPE32>.ladi-shape,
              #ACCORDION_SHAPE29,
              #ACCORDION_SHAPE29>.ladi-shape,
              #ACCORDION_SHAPE31,
              #ACCORDION_SHAPE31>.ladi-shape {
                left: 1007.25px;
              }

              #ACCORDION10 {
                top: 371.401px;
                left: 73.25px;
              }

              #ACCORDION_CONTENT43 {
                width: 1053.5px;
                height: 60px;
              }

              #ACCORDION7 {
                top: 123.401px;
                left: 73.25px;
              }

              #ACCORDION9 {
                top: 245.901px;
                left: 73.25px;
              }

              #ACCORDION_CONTENT41 {
                width: 1053.5px;
                height: 84px;
              }

              #FOOTER {
                height: 308.9px;
              }

              #FOOTER>.ladi-section-background {
                background-image: url("https://w.ladicdn.com/s1440x308/5c7362c6c417ab07e5196b05/lkYRh2Qy20200313061328.jpg");
              }

              #GROUP41 {
                width: 251px;
                height: 216.608px;
                top: 45.35px;
                left: 66.5px;
              }

              #GROUP29 {
                top: 159.268px;
              }

              #GROUP36 {
                top: 196.608px;
              }

              #GROUP42 {
                width: 272px;
                height: 211.109px;
                top: 45.35px;
                left: 453.5px;
              }

              #PARAGRAPH27,
              #PARAGRAPH28 {
                width: 272px;
              }

              #GROUP38 {
                top: 153.768px;
              }

              #GROUP39 {
                top: 191.109px;
              }

              #GROUP43 {
                width: 272.002px;
                top: 45.35px;
                left: 861.5px;
              }

              #GROUP37 {
                width: 271.65px;
              }

              #HEADLINE54 {
                width: 237px;
              }

              #POPUP_MENU_MOBILE_MENU1 {
                height: 300px;
              }

              #POPUP_MENU_MOBILE_MENU1>.ladi-popup>.ladi-popup-background {
                background-image: linear-gradient(rgb(67, 67, 67), rgb(0, 0, 0));
                background-color: initial;
                background-size: initial;
                background-origin: initial;
                background-position: initial;
                background-repeat: initial;
                background-attachment: initial;
                -webkit-background-clip: initial;
              }
            }

            @media (max-width: 767px) {
              #HEADER {
                height: 81.922px;
              }

              #MENU1 {
                width: 40.9149px;
                height: 36.9219px;
                top: 20.3906px;
                left: 17px;
              }

              #BUTTON3,
              #BUTTON12 {
                width: 123px;
                height: 46px;
              }

              #BUTTON3 {
                top: 17.3906px;
                left: 283.9px;
              }

              #BUTTON_TEXT3 {
                width: 123px;
              }

              #BUTTON_TEXT3>.ladi-headline,
              #BUTTON_TEXT12>.ladi-headline {
                font-size: 12px;
              }

              #GROUP5 {
                top: 24.9297px;
                left: 75.906px;
              }

              #IMAGE1,
              #IMAGE1>.ladi-image>.ladi-image-background {
                width: 101.412px;
                height: 25.3906px;
              }

              #IMAGE4,
              #IMAGE4>.ladi-image>.ladi-image-background {
                width: 67.5825px;
                height: 32.7812px;
              }

              #IMAGE4>.ladi-image>.ladi-image-background,
              #IMAGE38>.ladi-image>.ladi-image-background {
                background-image: url("https://w.ladicdn.com/s400x350/6684efaadbba9e0011a029ed/logo-vbi-04-20240910185812-uigds.png");
              }

              #HERO {
                height: 580.608px;
              }

              #HERO>.ladi-section-background {
                background-image: url("https://w.ladicdn.com/s768x580/6684efaadbba9e0011a029ed/ob3v9sm020240911045300.jpg");
              }

              #BUTTON8 {
                width: 173px;
                height: 40px;
                top: 501px;
                left: 17px;
              }

              #BUTTON_TEXT8 {
                width: 173px;
              }

              #HEADLINE11 {
                width: 299px;
                top: 316.172px;
                left: 17px;
              }

              #HEADLINE11>.ladi-headline,
              #PARAGRAPH9>.ladi-paragraph,
              #PARAGRAPH51>.ladi-paragraph,
              #PARAGRAPH50>.ladi-paragraph,
              #PARAGRAPH52>.ladi-paragraph {
                font-size: 14px;
              }

              #HEADLINE12 {
                width: 380px;
                top: 31px;
                left: 20px;
              }

              #HEADLINE12>.ladi-headline {
                font-size: 42px;
              }

              #SECTION16 {
                height: 90px;
              }

              #HEADLINE77 {
                width: 137px;
                top: 30.0004px;
                left: 10px;
              }

              #HEADLINE77>.ladi-headline {
                font-size: 19px;
                text-align: left;
              }

              #IMAGE37,
              #IMAGE37>.ladi-image>.ladi-image-background {
                width: 150.509px;
                height: 37.6831px;
              }

              #IMAGE37 {
                top: 26.1589px;
                left: 259.491px;
              }

              #IMAGE38,
              #IMAGE38>.ladi-image>.ladi-image-background {
                width: 92.3218px;
                height: 44.7812px;
              }

              #IMAGE38 {
                top: 22.6094px;
                left: 152.371px;
              }

              #ROADMAP {
                height: 2403.09px;
              }

              #GROUP12 {
                width: 376px;
                height: 152.1px;
                top: 40px;
                left: 22px;
              }

              #HEADLINE19,
              #PARAGRAPH5,
              #HEADLINE41 {
                width: 376px;
              }

              #HEADLINE19 {
                top: 0px;
                left: 0px;
              }

              #HEADLINE19>.ladi-headline,
              #HEADLINE41>.ladi-headline {
                font-size: 30px;
              }

              #PARAGRAPH5 {
                top: 88.1px;
                left: 0px;
              }

              #PARAGRAPH5>.ladi-paragraph,
              #HEADLINE38>.ladi-headline,
              #HEADLINE82>.ladi-headline,
              #HEADLINE84>.ladi-headline,
              #HEADLINE86>.ladi-headline {
                text-align: left;
              }

              #GROUP19 {
                top: 208.1px;
                left: 10px;
              }

              #GROUP15 {
                top: 898.1px;
                left: 10px;
              }

              #FRAME8 {
                top: 1574.1px;
                left: 10px;
              }

              #BUTTON13 {
                top: 2291.13px;
                left: 105.169px;
              }

              #BOOTCAMP {
                height: 2562.47px;
              }

              #HEADLINE39,
              #HEADLINE92 {
                width: 389px;
              }

              #HEADLINE39 {
                top: 25px;
                left: 21.5px;
              }

              #PARAGRAPH9 {
                width: 365px;
                top: 1632.47px;
                left: 27.5px;
              }

              #GROUP55 {
                top: 333px;
                left: 67px;
              }

              #IMAGE24 {
                top: 2288.47px;
                left: 31.6675px;
              }

              #IMAGE25 {
                top: 2108.47px;
                left: 35.6675px;
              }

              #IMAGE27 {
                top: 1791.47px;
                left: 31px;
              }

              #BUTTON11 {
                top: 2454.47px;
                left: 87.337px;
              }

              #HEADLINE64,
              #HEADLINE67 {
                width: 200px;
              }

              #HEADLINE64 {
                top: 2283.47px;
                left: 93.6675px;
              }

              #HEADLINE65 {
                width: 296px;
                top: 2347.47px;
                left: 92.333px;
              }

              #HEADLINE66 {
                width: 284px;
                top: 1998.47px;
                left: 94.5px;
              }

              #HEADLINE67 {
                top: 1927.47px;
                left: 94.5px;
              }

              #HEADLINE70 {
                top: 1787.47px;
                left: 93px;
              }

              #HEADLINE72,
              #HEADLINE78,
              #LINE8 {
                width: 288px;
              }

              #HEADLINE72 {
                top: 1824.47px;
                left: 95px;
              }

              #HEADLINE73 {
                width: 287px;
                top: 2167.47px;
                left: 93.6675px;
              }

              #HEADLINE74 {
                width: 224px;
                top: 2101.47px;
                left: 95.6675px;
              }

              #IMAGE31 {
                top: 1934.35px;
                left: 31px;
              }

              #GROUP56 {
                top: 1185.65px;
                left: 67px;
              }

              #GROUP57 {
                top: 745.824px;
                left: 67px;
              }

              #HEADLINE92 {
                top: 179px;
                left: 15.5px;
              }

              #HEADLINE92>.ladi-headline {
                font-size: 40px;
              }

              #HACKATHON {
                height: 3650.97px;
              }

              #HEADLINE40,
              #PARAGRAPH29,
              #PARAGRAPH40,
              #PARAGRAPH61 {
                width: 400px;
              }

              #HEADLINE40 {
                top: 59px;
                left: 8px;
              }

              #HEADLINE40>.ladi-headline {
                font-size: 38px;
              }

              #PARAGRAPH29 {
                top: 191px;
                left: 10px;
              }

              #PARAGRAPH49 {
                width: 283px;
                top: 408px;
                left: 63.75px;
              }

              #PARAGRAPH49>.ladi-paragraph {
                font-size: 30px;
                text-align: center;
              }

              #FRAME54 {
                top: 697px;
                left: 10.5px;
              }

              #IMAGE42>.ladi-image>.ladi-image-background {
                width: 962.874px;
                left: -294px;
                background-image: url("https://w.ladicdn.com/s1300x800/6684efaadbba9e0011a029ed/blox-nominatie-1-scaled-20241001064424-a0-tq.jpg");
              }

              #FRAME56 {
                top: 1594.94px;
                left: 10.5px;
              }

              #IMAGE43>.ladi-image>.ladi-image-background {
                width: 856.958px;
                left: -281px;
                background-image: url("https://w.ladicdn.com/s1200x800/6684efaadbba9e0011a029ed/download-20241001064021-sctzg.jpg");
              }

              #FRAME58 {
                top: 2520.91px;
                left: 10.5px;
              }

              #IMAGE44>.ladi-image>.ladi-image-background {
                width: 769.889px;
                left: -49px;
                background-image: url("https://w.ladicdn.com/s1100x800/6684efaadbba9e0011a029ed/738-scaled-e1595409765862-20241001064046-qw1mz.jpg");
              }

              #HEADLINE86,
              #HEADLINE79 {
                width: 346px;
              }

              #BUTTON23 {
                top: 3541.91px;
                left: 97.6695px;
              }

              #GROUP63 {
                top: 1408.23px;
                left: 32.5px;
              }

              #GROUP64 {
                top: 3332.19px;
                left: 30.5px;
              }

              #GROUP65 {
                top: 2355.15px;
                left: 30.5px;
              }

              #PARAGRAPH72 {
                left: 0px;
              }

              #ACCORDION13,
              #ACCORDION_MENU51,
              #ACCORDION12,
              #ACCORDION_MENU49,
              #ACCORDION14,
              #ACCORDION_MENU53 {
                width: 410.5px;
                height: 41px;
              }

              #ACCORDION13 {
                top: 584px;
              }

              #ACCORDION_CONTENT50,
              #ACCORDION_CONTENT48,
              #ACCORDION_CONTENT52,
              #ACCORDION_CONTENT39,
              #ACCORDION_CONTENT45,
              #ACCORDION_CONTENT43,
              #ACCORDION_CONTENT37,
              #ACCORDION_CONTENT41 {
                width: 410.5px;
                height: 150px;
              }

              #ACCORDION_CONTENT50,
              #ACCORDION_CONTENT48,
              #ACCORDION_CONTENT52 {
                top: 51px;
              }

              #PARAGRAPH51,
              #PARAGRAPH50,
              #PARAGRAPH52,
              #PARAGRAPH23,
              #PARAGRAPH26,
              #PARAGRAPH25,
              #PARAGRAPH22,
              #PARAGRAPH24 {
                width: 369px;
              }

              #PARAGRAPH51,
              #PARAGRAPH50,
              #PARAGRAPH52 {
                top: 19px;
                left: 14.25px;
              }

              #ACCORDION_SHAPE38,
              #ACCORDION_SHAPE38>.ladi-shape,
              #ACCORDION_SHAPE37,
              #ACCORDION_SHAPE37>.ladi-shape,
              #ACCORDION_SHAPE39,
              #ACCORDION_SHAPE39>.ladi-shape {
                top: 11.5px;
                left: 382px;
              }

              #ACCORDION_SHAPE38>.ladi-shape,
              #ACCORDION_SHAPE37>.ladi-shape,
              #ACCORDION_SHAPE39>.ladi-shape {
                width: 18px;
                height: 18px;
              }

              #HEADLINE79,
              #HEADLINE78,
              #HEADLINE80 {
                top: 8px;
                left: 16px;
              }

              #HEADLINE79>.ladi-headline,
              #HEADLINE78>.ladi-headline,
              #HEADLINE80>.ladi-headline {
                font-size: 16px;
              }

              #ACCORDION12 {
                top: 533px;
              }

              #ACCORDION14 {
                top: 635px;
              }

              #HEADLINE80 {
                width: 342px;
              }

              #SECTION17 {
                height: 2689.83px;
              }

              #PARAGRAPH40 {
                top: 23.9px;
                left: 8px;
              }

              #PARAGRAPH40>.ladi-paragraph,
              #PARAGRAPH61>.ladi-paragraph {
                font-size: 22px;
                text-align: center;
              }

              #GROUP54 {
                top: 1118.76px;
                left: 65px;
              }

              #GROUP53 {
                top: 77.9px;
                left: 65px;
              }

              #BUTTON_GROUP3,
              #BUTTON22 {
                width: 98px;
              }

              #BUTTON_GROUP3 {
                top: 511.7px;
                left: 65px;
              }

              #LINE8 {
                top: 1516.53px;
                left: 60px;
              }

              #LINE9 {
                top: 483.7px;
                left: 65px;
              }

              #GROUP58 {
                top: 602.76px;
                left: 65px;
              }

              #PARAGRAPH61 {
                top: 1554.7px;
                left: 10px;
              }

              #GROUP59 {
                top: 1621.7px;
                left: 71px;
              }

              #BUTTON_GROUP4,
              #BUTTON25,
              #BUTTON_TEXT25 {
                width: 92px;
              }

              #GROUP61 {
                top: 2160.48px;
                left: 71px;
              }

              #BUTTON_GROUP5,
              #BUTTON26,
              #BUTTON_TEXT26 {
                width: 90px;
              }

              #BUTTON_GROUP6,
              #BUTTON27,
              #BUTTON_TEXT27 {
                width: 99px;
              }

              #BUTTON_GROUP6 {
                top: 2599.26px;
                left: 175px;
              }

              #FAQ {
                height: 500px;
              }

              #HEADLINE41 {
                top: 18px;
                left: 19.999px;
              }

              #BUTTON12 {
                top: 416px;
                left: 146.499px;
              }

              #ACCORDION8,
              #ACCORDION_MENU40 {
                width: 410.5px;
                height: 73px;
              }

              #ACCORDION8 {
                top: 136px;
                left: 4.75px;
              }

              #ACCORDION_SHAPE30,
              #ACCORDION_SHAPE30>.ladi-shape {
                top: 25.4756px;
                left: 380px;
              }

              #HEADLINE60,
              #HEADLINE59 {
                width: 339px;
              }

              #HEADLINE60 {
                top: 14.2439px;
              }

              #ACCORDION11,
              #ACCORDION_MENU46,
              #ACCORDION10,
              #ACCORDION_MENU44,
              #ACCORDION7,
              #ACCORDION_MENU38,
              #ACCORDION9,
              #ACCORDION_MENU42 {
                width: 410.5px;
              }

              #ACCORDION11 {
                top: 283px;
                left: 4.75px;
              }

              #ACCORDION_SHAPE33,
              #ACCORDION_SHAPE33>.ladi-shape,
              #ACCORDION_SHAPE32,
              #ACCORDION_SHAPE32>.ladi-shape,
              #ACCORDION_SHAPE29,
              #ACCORDION_SHAPE29>.ladi-shape,
              #ACCORDION_SHAPE31,
              #ACCORDION_SHAPE31>.ladi-shape {
                left: 382px;
              }

              #HEADLINE63 {
                width: 341px;
              }

              #ACCORDION10 {
                top: 340px;
                left: 2.749px;
              }

              #HEADLINE62 {
                width: 340px;
              }

              #ACCORDION7 {
                top: 87px;
                left: 2.749px;
              }

              #ACCORDION9 {
                top: 226px;
                left: 4.75px;
              }

              #HEADLINE61 {
                width: 344px;
              }

              #FOOTER {
                height: 804.2px;
              }

              #FOOTER>.ladi-section-background {
                background-image: url("https://w.ladicdn.com/s768x804/5c7362c6c417ab07e5196b05/lkYRh2Qy20200313061328.jpg");
              }

              #GROUP41 {
                width: 351px;
                height: 193.608px;
                top: 278.25px;
                left: 29.999px;
              }

              #HEADLINE45 {
                width: 351px;
              }

              #GROUP29 {
                top: 136.268px;
              }

              #GROUP36 {
                top: 173.608px;
              }

              #GROUP42 {
                width: 347px;
                height: 190.108px;
                top: 541px;
                left: 29.999px;
              }

              #PARAGRAPH27 {
                width: 347px;
              }

              #GROUP38 {
                top: 132.768px;
              }

              #GROUP39 {
                top: 170.108px;
              }

              #GROUP43,
              #PARAGRAPH28 {
                width: 356px;
              }

              #GROUP43 {
                top: 39px;
                left: 29.999px;
              }

              #GROUP37 {
                width: 241.65px;
              }

              #HEADLINE54 {
                width: 207px;
              }

              #POPUP_MENU_MOBILE_MENU1 {
                height: 349px;
              }

              #POPUP_MENU_MOBILE_MENU1>.ladi-popup>.ladi-popup-background {
                background-color: rgb(0, 0, 0);
              }
            }
          </style>
          <style id="style_lazyload" type="text/css">
            body.lazyload .ladi-overlay,
            body.lazyload .ladi-box,
            body.lazyload .ladi-button-background,
            body.lazyload .ladi-collection-item:before,
            body.lazyload .ladi-countdown-background,
            body.lazyload .ladi-form-item-background,
            body.lazyload .ladi-form-label-container .ladi-form-label-item.image,
            body.lazyload .ladi-frame-background,
            body.lazyload .ladi-gallery-view-item,
            body.lazyload .ladi-gallery-control-item,
            body.lazyload .ladi-headline,
            body.lazyload .ladi-image-background,
            body.lazyload .ladi-image-compare,
            body.lazyload .ladi-list-paragraph ul li:before,
            body.lazyload .ladi-section-background,
            body.lazyload .ladi-survey-option-background,
            body.lazyload .ladi-survey-option-image,
            body.lazyload .ladi-tabs-background,
            body.lazyload .ladi-video-background,
            body.lazyload .ladi-banner,
            body.lazyload .ladi-spin-lucky-screen,
            body.lazyload .ladi-spin-lucky-start {
              background-image: none !important;
            }
          </style>
        </head>

        <body class="lazyload"><svg xmlns="http://www.w3.org/2000/svg"
            style="width: 0px; height: 0px; position: absolute; overflow: hidden; display: none;">
            <symbol id="shape_DExBOlsOub" viewBox="0 0 32 32">
              <image href="https://w.ladicdn.com/ladiui/icons/social/zalo.svg" height="32" width="32"></image>
            </symbol>
            <symbol id="shape_ruYIeHWFBO" viewBox="0 0 32 32">
              <image href="https://w.ladicdn.com/ladiui/icons/social/facebook.svg" height="32" width="32"></image>
            </symbol>
            <symbol id="shape_vyaDwfXQCs" viewBox="0 0 24 24">
              <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"></path>
            </symbol>
          </svg>
          <div class="ladi-wraper">
            <div id="BODY_BACKGROUND" class='ladi-section'>
              <div class='ladi-section-background'></div>
            </div>
            <div id="HEADER" class='ladi-section'>
              <div class='ladi-section-background'></div>
              <div class="ladi-container">
                <div id="MENU1" class='ladi-element'>
                  <div class="ladi-menu menu-icon-item menu-icon-1 theme-1"></div>
                  <ul class="ladi-menu list-menu-items theme-1">
                    <li class='ladi-menu-item ladi-transition' data-child="false"><a
                        data-item="%7B%22action%22%3A%22HEADER%22%2C%22type%22%3A%22section%22%7D">Trang chủ</a></li>
                    <li class='ladi-menu-item ladi-transition' data-child="false"><a
                        data-item="%7B%22action%22%3A%22BOOTCAMP%22%2C%22type%22%3A%22section%22%7D">Bootcamp</a></li>
                    <li class='ladi-menu-item ladi-transition' data-child="false"><a
                        data-item="%7B%22action%22%3A%22HACKATHON%22%2C%22type%22%3A%22section%22%7D">Hackathon</a></li>
                    <li class='ladi-menu-item ladi-transition' data-child="false"><a
                        data-item="%7B%22action%22%3A%22FAQ%22%2C%22type%22%3A%22section%22%7D">FAQ</a></li>
                  </ul>
                </div><a href="https://vbi.openedu.net/courses/cardano-bootcamp-50467" target="_blank" id="BUTTON3"
                  class='ladi-element'>
                  <div class='ladi-button ladi-transition'>
                    <div class="ladi-button-background"></div>
                    <div id="BUTTON_TEXT3" class='ladi-element ladi-button-headline'>
                      <p class='ladi-headline ladi-transition'>Tham gia ngay</p>
                    </div>
                  </div>
                </a>
                <div id="GROUP5" class='ladi-element'>
                  <div class='ladi-frame z-index-1'>
                    <div id="IMAGE1" class='ladi-element'>
                      <div class='ladi-image ladi-transition'>
                        <div class="ladi-image-background"></div>
                      </div>
                    </div>
                    <div id="IMAGE4" class='ladi-element'>
                      <div class='ladi-image ladi-transition'>
                        <div class="ladi-image-background"></div>
                      </div>
                    </div>
                  </div>
                  <div class="ladi-frame-bg">
                    <div class="ladi-frame-background"></div>
                  </div>
                </div>
              </div>
            </div>
            <div id="HERO" class='ladi-section'>
              <div class='ladi-section-background'></div>
              <div class="ladi-overlay"></div>
              <div class="ladi-container"><a href="https://vbi.openedu.net/courses/cardano-bootcamp-50467" target="_blank"
                  id="BUTTON8" class='ladi-element'>
                  <div class='ladi-button ladi-transition'>
                    <div class="ladi-button-background"></div>
                    <div id="BUTTON_TEXT8" class='ladi-element ladi-button-headline'>
                      <p class='ladi-headline ladi-transition'>HỌC MIỄN PHÍ</p>
                    </div>
                  </div>
                </a>
                <div id="HEADLINE11" class='ladi-element'>
                  <h3 class='ladi-headline ladi-transition'>Cardano Bootcamp &amp; Hackathon 2024 là chuỗi hoạt động kéo dài
                    trong 12 tuần bao gồm Haskell Bootcamp và Cardano Hackathon nhằm giúp các bạn lập trình viên Web2 và Web3 có
                    thể học tập và phát triển cùng với hệ sinh thái Cardano</h3>
                </div>
                <div id="HEADLINE12" class='ladi-element'>
                  <h3 class='ladi-headline ladi-transition'>Kiến tạo tương lai cùng Cardano Bootcamp &amp; Hackathon 2024</h3>
                </div>
              </div>
            </div>
            <div id="SECTION16" class='ladi-section'>
              <div class='ladi-section-background'></div>
              <div class="ladi-container">
                <div id="HEADLINE77" class='ladi-element'>
                  <h3 class='ladi-headline'>Đơn vị tổ chức</h3>
                </div>
                <div id="IMAGE37" class='ladi-element'>
                  <div class='ladi-image ladi-transition'>
                    <div class="ladi-image-background"></div>
                  </div>
                </div>
                <div id="IMAGE38" class='ladi-element'>
                  <div class='ladi-image ladi-transition'>
                    <div class="ladi-image-background"></div>
                  </div>
                </div>
              </div>
            </div>
            <div id="ROADMAP" class='ladi-section'>
              <div class='ladi-section-background'></div>
              <div class="ladi-container">
                <div id="GROUP12" class='ladi-element'>
                  <div class='ladi-frame z-index-1'>
                    <div id="HEADLINE19" class='ladi-element'>
                      <h2 class='ladi-headline'>ROADMAP<br></h2>
                    </div>
                    <div id="PARAGRAPH5" class='ladi-element'>
                      <div class='ladi-paragraph'>Cardano Bootcamp &amp; Hackathon 2024 là chuỗi hoạt động kéo dài trong 12 tuần
                        bao gồm Haskell Bootcamp và Cardano Hackathon nhằm giúp các bạn lập trình viên Web2 và Web3 có thể học
                        tập và phát triển cùng với hệ sinh thái Cardano</div>
                    </div>
                  </div>
                  <div class="ladi-frame-bg">
                    <div class="ladi-frame-background"></div>
                  </div>
                </div>
                <div id="GROUP19" class='ladi-element'>
                  <div class='ladi-frame z-index-1'>
                    <div id="IMAGE19" class='ladi-element'>
                      <div class='ladi-image'>
                        <div class="ladi-image-background"></div>
                      </div>
                    </div>
                    <div id="FRAME20" class='ladi-element'>
                      <div class='ladi-frame z-index-1'>
                        <div id="HEADLINE37" class='ladi-element'>
                          <h3 class='ladi-headline'>Cardano Smart Contract Bootcamp<br>Từ 02/10 - 20/11<br></h3>
                        </div>
                        <div id="HEADLINE38" class='ladi-element'>
                          <p class='ladi-headline'>Khóa bootcamp được thiết kế để giúp lập trình viên Web2 và Web3 có thể sử
                            dụng được Haskell, ngôn ngữ chính của Cardano từ con số 0 một cách trực quan, dễ hiểu.<br><br></p>
                        </div>
                      </div>
                      <div class="ladi-frame-bg">
                        <div class="ladi-frame-background"></div>
                      </div>
                    </div>
                  </div>
                  <div class="ladi-frame-bg">
                    <div class="ladi-frame-background"></div>
                  </div>
                </div>
                <div id="GROUP15" class='ladi-element'>
                  <div class='ladi-frame z-index-1'>
                    <div id="IMAGE8" class='ladi-element'>
                      <div class='ladi-image'>
                        <div class="ladi-image-background"></div>
                      </div>
                    </div>
                    <div id="GROUP14" class='ladi-element'>
                      <div class='ladi-frame z-index-1'>
                        <div id="HEADLINE23" class='ladi-element'>
                          <h3 class='ladi-headline'>Cardano Vietnam Hackathon<br>Từ 11/11 - 21/12&nbsp;<br></h3>
                        </div>
                        <div id="HEADLINE24" class='ladi-element'>
                          <p class='ladi-headline'>Giải đấu dành riêng cho lập trình viên hệ Cardano với giải thưởng cực kỳ giá
                            trị cùng sự hỗ trợ đến từ các chuyên gia Web3 của học viện VBI.<br></p>
                        </div>
                      </div>
                      <div class="ladi-frame-bg">
                        <div class="ladi-frame-background"></div>
                      </div>
                    </div>
                  </div>
                  <div class="ladi-frame-bg">
                    <div class="ladi-frame-background"></div>
                  </div>
                </div>
                <div id="FRAME8" class='ladi-element'>
                  <div class='ladi-frame z-index-1'>
                    <div id="IMAGE14" class='ladi-element'>
                      <div class='ladi-image'>
                        <div class="ladi-image-background"></div>
                      </div>
                    </div>
                    <div id="FRAME9" class='ladi-element'>
                      <div class='ladi-frame z-index-1'>
                        <div id="HEADLINE27" class='ladi-element'>
                          <h3 class='ladi-headline'>Demo Day<br>21/12/2024<br></h3>
                        </div>
                        <div id="HEADLINE28" class='ladi-element'>
                          <p class='ladi-headline'>Sự kiện hoành tráng với sự tham gia của 10 đội thi lọt qua vòng Hackathon để
                            demo trước ban giám khảo cùng với khán giả để đoạt giải trung cuộc.<br></p>
                        </div>
                      </div>
                      <div class="ladi-frame-bg">
                        <div class="ladi-frame-background"></div>
                      </div>
                    </div>
                  </div>
                  <div class="ladi-frame-bg">
                    <div class="ladi-frame-background"></div>
                  </div>
                </div><a href="https://vbi.openedu.net/courses/cardano-bootcamp-50467" target="_blank" id="BUTTON13"
                  class='ladi-element'>
                  <div class='ladi-button ladi-transition'>
                    <div class="ladi-button-background"></div>
                    <div id="BUTTON_TEXT13" class='ladi-element ladi-button-headline'>
                      <p class='ladi-headline ladi-transition'>Tham gia ngay</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div id="BOOTCAMP" class='ladi-section'>
              <div class='ladi-section-background'></div>
              <div class="ladi-container">
                <div id="HEADLINE39" class='ladi-element'>
                  <h2 class='ladi-headline'>CARDANO SMART CONTRACT BOOTCAMP<br></h2>
                </div>
                <div id="PARAGRAPH9" class='ladi-element'>
                  <div class='ladi-paragraph'>Bạn sẽ học cách sử dụng các công cụ và ngôn ngữ hiện đại như Aiken, Plutus, và
                    Haskell để xây dựng hợp đồng thông minh. Thông qua các bài học thực hành và dự án thực tế, bạn sẽ nắm vững
                    cách phát triển cả phần on-chain và off-chain của DApps.<br></div>
                </div>
                <div id="GROUP55" class='ladi-element'>
                  <div class='ladi-group'>
                    <div id="IMAGE23" class='ladi-element'>
                      <div class='ladi-image'>
                        <div class="ladi-image-background"></div>
                      </div>
                    </div>
                    <div id="PARAGRAPH21" class='ladi-element'>
                      <div class='ladi-paragraph'><span style="font-weight: bold; font-size: 22px;">Kaht Long</span><br>Giảng
                        viên tại VBI<br>Ex-AhaMove<br></div>
                    </div>
                  </div>
                </div>
                <div id="IMAGE24" class='ladi-element'>
                  <div class='ladi-image'>
                    <div class="ladi-image-background"></div>
                  </div>
                </div>
                <div id="IMAGE25" class='ladi-element'>
                  <div class='ladi-image'>
                    <div class="ladi-image-background"></div>
                  </div>
                </div>
                <div id="IMAGE27" class='ladi-element'>
                  <div class='ladi-image'>
                    <div class="ladi-image-background"></div>
                  </div>
                </div><a href="https://vbi.openedu.net/courses/cardano-bootcamp-50467" target="_blank" id="BUTTON11"
                  class='ladi-element'>
                  <div class='ladi-button ladi-transition'>
                    <div class="ladi-button-background"></div>
                    <div id="BUTTON_TEXT11" class='ladi-element ladi-button-headline'>
                      <p class='ladi-headline ladi-transition'>Tham gia ngay</p>
                    </div>
                  </div>
                </a>
                <div id="HEADLINE64" class='ladi-element'>
                  <h3 class='ladi-headline'>Học online hoàn toàn trên OpenEdu<br></h3>
                </div>
                <div id="HEADLINE65" class='ladi-element'>
                  <h3 class='ladi-headline'>Hoàn thành với tốc độ của bạn với các bài giảng video hàng tuần và các buổi AMA để
                    có thể trao đổi trực tiếp với giảng viên</h3>
                </div>
                <div id="HEADLINE66" class='ladi-element'>
                  <h3 class='ladi-headline'>Khóa học sẽ cấp chứng chỉ lập trình Smart Contract bằng Cardano được Cardano
                    Foundation và học viên VBI chứng nhận</h3>
                </div>
                <div id="HEADLINE67" class='ladi-element'>
                  <h3 class='ladi-headline'>Certificate hoàn thành từ Foundation<br></h3>
                </div>
                <div id="HEADLINE70" class='ladi-element'>
                  <h3 class='ladi-headline'>Bài giảng dễ hiểu<br></h3>
                </div>
                <div id="HEADLINE72" class='ladi-element'>
                  <h3 class='ladi-headline'>Dành cho cả các bạn lập trình viên chưa biết về Web3, bài giảng được chia nhỏ để các
                    bạn hoàn thành dễ dàng</h3>
                </div>
                <div id="HEADLINE73" class='ladi-element'>
                  <h3 class='ladi-headline'>Khóa học có những chương trình bounty tạo động lực cho người học hoàn thành để có
                    thể nhận được phần thưởng giá trị</h3>
                </div>
                <div id="HEADLINE74" class='ladi-element'>
                  <h3 class='ladi-headline'>Phần thưởng hoàn thành 25 triệu đồng<br></h3>
                </div>
                <div id="IMAGE31" class='ladi-element'>
                  <div class='ladi-image'>
                    <div class="ladi-image-background"></div>
                  </div>
                </div>
                <div id="GROUP56" class='ladi-element'>
                  <div class='ladi-group'>
                    <div id="IMAGE45" class='ladi-element'>
                      <div class='ladi-image'>
                        <div class="ladi-image-background"></div>
                      </div>
                    </div>
                    <div id="PARAGRAPH59" class='ladi-element'>
                      <div class='ladi-paragraph'><span style="font-size: 22px; font-weight: 700;">Đại Thắng</span><br>Giảng
                        viên tại VBI<br>Đạt được nhiều giải tại các cuộc thi Web3 lớn<br></div>
                    </div>
                  </div>
                </div>
                <div id="GROUP57" class='ladi-element'>
                  <div class='ladi-group'>
                    <div id="IMAGE46" class='ladi-element'>
                      <div class='ladi-image'>
                        <div class="ladi-image-background"></div>
                      </div>
                    </div>
                    <div id="PARAGRAPH60" class='ladi-element'>
                      <div class='ladi-paragraph'><span style="font-weight: bold; font-size: 22px;">Thanh Tùng</span><br>Giảng
                        viên tại VBI<br>Tham gia và đạt giải tại nhiều sự kiện Hackathon<br></div>
                    </div>
                  </div>
                </div>
                <div id="HEADLINE92" class='ladi-element'>
                  <h2 class='ladi-headline'>GIẢNG VIÊN</h2>
                </div>
              </div>
            </div>
            <div id="HACKATHON" class='ladi-section'>
              <div class='ladi-section-background'></div>
              <div class="ladi-container">
                <div id="HEADLINE40" class='ladi-element'>
                  <h2 class='ladi-headline'>CARDANO VIETNAM HACKATHON 2024<br></h2>
                </div>
                <div id="PARAGRAPH29" class='ladi-element'>
                  <div class='ladi-paragraph'>Cardano Vietnam Hackathon 2024 là cơ hội tuyệt vời để các nhà phát triển Web3 cùng
                    nhau sáng tạo các giải pháp blockchain đột phá trên nền tảng Cardano.<br><br>Dù bạn là developer dày dạn
                    kinh nghiệm hay mới bắt đầu với blockchain, Cardano Vietnam Hackathon 2024 chào đón tất cả những người đam
                    mê công nghệ và mong muốn tạo ra giải pháp Web3 sáng tạo.<br><br></div>
                </div>
                <div id="PARAGRAPH49" class='ladi-element'>
                  <div class='ladi-paragraph'>Tổng giải thưởng: 250 triệu đồng<br></div>
                </div>
                <div id="FRAME54" class='ladi-element'>
                  <div class='ladi-frame z-index-1'>
                    <div id="IMAGE42" class='ladi-element'>
                      <div class='ladi-image'>
                        <div class="ladi-image-background"></div>
                      </div>
                    </div>
                    <div id="FRAME55" class='ladi-element'>
                      <div class='ladi-frame z-index-1'>
                        <div id="HEADLINE81" class='ladi-element'>
                          <h3 class='ladi-headline'>Track 1: Build on Cardano<br></h3>
                        </div>
                        <div id="HEADLINE82" class='ladi-element'>
                          <p class='ladi-headline'>Trong hạng mục này, người tham gia sẽ phát triển các ứng dụng phi tập trung
                            (dApps) nhằm thúc đẩy việc áp dụng rộng rãi Web3 trên Cardano. Các nhà phát triển được khuyến khích
                            sáng tạo tự do, miễn là dự án tận dụng được blockchain Cardano.<br></p>
                        </div>
                      </div>
                      <div class="ladi-frame-bg">
                        <div class="ladi-frame-background"></div>
                      </div>
                    </div>
                  </div>
                  <div class="ladi-frame-bg">
                    <div class="ladi-frame-background"></div>
                  </div>
                </div>
                <div id="FRAME56" class='ladi-element'>
                  <div class='ladi-frame z-index-1'>
                    <div id="IMAGE43" class='ladi-element'>
                      <div class='ladi-image'>
                        <div class="ladi-image-background"></div>
                      </div>
                    </div>
                    <div id="FRAME57" class='ladi-element'>
                      <div class='ladi-frame z-index-1'>
                        <div id="HEADLINE83" class='ladi-element'>
                          <h3 class='ladi-headline'>Track 2: Tooling &amp; Infrastructure<br></h3>
                        </div>
                        <div id="HEADLINE84" class='ladi-element'>
                          <p class='ladi-headline'>Trong hạng mục này, người tham gia sẽ củng cố hệ sinh thái Cardano bằng cách
                            phát triển cơ sở hạ tầng và công cụ quan trọng, chẳng hạn như các API tiên tiến hoặc các cầu nối
                            liền mạch, nhằm nâng cao tính linh hoạt và khả năng tiếp cận của Cardano cho tất cả người dùng và
                            nhà phát triển.<br></p>
                        </div>
                      </div>
                      <div class="ladi-frame-bg">
                        <div class="ladi-frame-background"></div>
                      </div>
                    </div>
                  </div>
                  <div class="ladi-frame-bg">
                    <div class="ladi-frame-background"></div>
                  </div>
                </div>
                <div id="FRAME58" class='ladi-element'>
                  <div class='ladi-frame z-index-1'>
                    <div id="IMAGE44" class='ladi-element'>
                      <div class='ladi-image'>
                        <div class="ladi-image-background"></div>
                      </div>
                    </div>
                    <div id="FRAME59" class='ladi-element'>
                      <div class='ladi-frame z-index-1'>
                        <div id="HEADLINE85" class='ladi-element'>
                          <h3 class='ladi-headline'>Track 3: Web2-to-Web3 &amp; Decentralize AI<br></h3>
                        </div>
                        <div id="HEADLINE86" class='ladi-element'>
                          <p class='ladi-headline'>Hạng mục này tập trung vào hai lĩnh vực đổi mới: giải pháp chuyển đổi từ Web2
                            sang Web3 dựa trên Cardano cho các ngành truyền thống, và phát triển mô hình AI hoặc ứng dụng AI phi
                            tập trung trên nền tảng Cardano. Mục tiêu là thúc đẩy sự đổi mới trong việc áp dụng blockchain vào
                            các ngành công nghiệp hiện có, đồng thời khám phá tiềm năng của AI phi tập trung.<br></p>
                        </div>
                      </div>
                      <div class="ladi-frame-bg">
                        <div class="ladi-frame-background"></div>
                      </div>
                    </div>
                  </div>
                  <div class="ladi-frame-bg">
                    <div class="ladi-frame-background"></div>
                  </div>
                </div>
                <div data-action="true" id="BUTTON23" class='ladi-element'>
                  <div class='ladi-button ladi-transition'>
                    <div class="ladi-button-background"></div>
                    <div id="BUTTON_TEXT23" class='ladi-element ladi-button-headline'>
                      <p class='ladi-headline ladi-transition'>Tham gia Hackathon</p>
                    </div>
                  </div>
                </div>
                <div id="GROUP63" class='ladi-element'>
                  <div class='ladi-group'>
                    <div id="PARAGRAPH67" class='ladi-element'>
                      <div class='ladi-paragraph'>Tổng giải thưởng: 40 triệu đồng<br></div>
                    </div>
                    <div id="PARAGRAPH68" class='ladi-element'>
                      <div class='ladi-paragraph'>(1st) Giải nhất: 20 triệu đồng<br>(2nd) Giải nhì: 12 triệu đồng<br>(3rd) Giải
                        ba: 8 triệu đồng</div>
                    </div>
                  </div>
                </div>
                <div id="GROUP64" class='ladi-element'>
                  <div class='ladi-group'>
                    <div id="PARAGRAPH70" class='ladi-element'>
                      <div class='ladi-paragraph'>Tổng giải thưởng: 40 triệu đồng<br></div>
                    </div>
                    <div id="PARAGRAPH71" class='ladi-element'>
                      <div class='ladi-paragraph'>(1st) Giải nhất: 20 triệu đồng<br>(2nd) Giải nhì: 12 triệu đồng<br>(3rd) Giải
                        ba: 8 triệu đồng</div>
                    </div>
                  </div>
                </div>
                <div id="GROUP65" class='ladi-element'>
                  <div class='ladi-group'>
                    <div id="PARAGRAPH72" class='ladi-element'>
                      <div class='ladi-paragraph'>Tổng giải thưởng: 40 triệu đồng<br></div>
                    </div>
                    <div id="PARAGRAPH73" class='ladi-element'>
                      <div class='ladi-paragraph'>(1st) Giải nhất: 20 triệu đồng<br>(2nd) Giải nhì: 12 triệu đồng<br>(3rd) Giải
                        ba: 8 triệu đồng</div>
                    </div>
                  </div>
                </div>
                <div id="ACCORDION13" class='ladi-element'>
                  <div class='ladi-accordion'>
                    <div id="ACCORDION_CONTENT50" class='ladi-element'>
                      <div class='ladi-frame ladi-frame-bg'>
                        <div class="ladi-frame-background"></div>
                        <div id="PARAGRAPH51" class='ladi-element'>
                          <div class='ladi-paragraph'>Giải "Xây dựng Cardano" sẽ được phân phối đồng đều cho các dự án đủ điều
                            kiện nhằm khuyến khích sự tham gia rộng rãi và thúc đẩy sự phát triển trong hệ sinh thái Cardano.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div data-action="true" id="ACCORDION_MENU51" class='ladi-element accordion-menu'>
                      <div class='ladi-frame ladi-frame-bg'>
                        <div class="ladi-frame-background"></div>
                        <div id="ACCORDION_SHAPE38" class='ladi-element ladi-accordion-shape'>
                          <div class='ladi-shape'><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                              preserveAspectRatio="none" viewBox="0 0 24 24" class="" fill="#000">
                              <use xlink:href="#shape_vyaDwfXQCs"></use>
                            </svg></div>
                        </div>
                        <div id="HEADLINE79" class='ladi-element'>
                          <h6 class='ladi-headline'>Cardano Builder Prize: 40 triệu đồng<br></h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="ACCORDION12" class='ladi-element'>
                  <div class='ladi-accordion'>
                    <div id="ACCORDION_CONTENT48" class='ladi-element'>
                      <div class='ladi-frame ladi-frame-bg'>
                        <div class="ladi-frame-background"></div>
                        <div id="PARAGRAPH50" class='ladi-element'>
                          <div class='ladi-paragraph'>Giải Grand Champion sẽ được trao cho đội có dự án xuất sắc nhất. Chỉ một
                            đội trong số 6 đội lọt vào vòng chung kết vào ngày trình diễn cuối cùng sẽ nhận được giải thưởng
                            này, bên cạnh giải thưởng theo track của đội.</div>
                        </div>
                      </div>
                    </div>
                    <div data-action="true" id="ACCORDION_MENU49" class='ladi-element accordion-menu'>
                      <div class='ladi-frame ladi-frame-bg'>
                        <div class="ladi-frame-background"></div>
                        <div id="ACCORDION_SHAPE37" class='ladi-element ladi-accordion-shape'>
                          <div class='ladi-shape'><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                              preserveAspectRatio="none" viewBox="0 0 24 24" class="" fill="#000">
                              <use xlink:href="#shape_vyaDwfXQCs"></use>
                            </svg></div>
                        </div>
                        <div id="HEADLINE78" class='ladi-element'>
                          <h6 class='ladi-headline'>Grand Champion Prize: 80 triệu đồng<br></h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="ACCORDION14" class='ladi-element'>
                  <div class='ladi-accordion'>
                    <div id="ACCORDION_CONTENT52" class='ladi-element'>
                      <div class='ladi-frame ladi-frame-bg'>
                        <div class="ladi-frame-background"></div>
                        <div id="PARAGRAPH52" class='ladi-element'>
                          <div class='ladi-paragraph'>Giải "Cộng đồng" được trao cho dự án nhận được nhiều phiếu bầu nhất từ
                            cộng đồng. Tất cả các dự án đều đủ điều kiện nhận giải thưởng này. Số phiếu bầu từ cộng đồng được
                            xác định bằng số lượt thích và phản ứng đối với bài đăng của dự án trên bất kỳ nền tảng nào mà đội
                            chọn.</div>
                        </div>
                      </div>
                    </div>
                    <div data-action="true" id="ACCORDION_MENU53" class='ladi-element accordion-menu'>
                      <div class='ladi-frame ladi-frame-bg'>
                        <div class="ladi-frame-background"></div>
                        <div id="ACCORDION_SHAPE39" class='ladi-element ladi-accordion-shape'>
                          <div class='ladi-shape'><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                              preserveAspectRatio="none" viewBox="0 0 24 24" class="" fill="#000">
                              <use xlink:href="#shape_vyaDwfXQCs"></use>
                            </svg></div>
                        </div>
                        <div id="HEADLINE80" class='ladi-element'>
                          <h6 class='ladi-headline'>Cardano People's Choice: 10 triệu đồng<br></h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="SECTION17" class='ladi-section'>
              <div class='ladi-section-background'></div>
              <div class="ladi-container">
                <div id="PARAGRAPH40" class='ladi-element'>
                  <div class='ladi-paragraph'>Giảm khảo<br></div>
                </div>
                <div id="GROUP54" class='ladi-element'>
                  <div class='ladi-group'>
                    <div id="PARAGRAPH46" class='ladi-element'>
                      <div class='ladi-paragraph'>Mr. Kaht Long</div>
                    </div>
                    <div id="PARAGRAPH47" class='ladi-element'>
                      <div class='ladi-paragraph'>Giảng viên<br>VBI Academy<br></div>
                    </div>
                    <div id="IMAGE39" class='ladi-element'>
                      <div class='ladi-image'>
                        <div class="ladi-image-background"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="GROUP53" class='ladi-element'>
                  <div class='ladi-group'>
                    <div id="PARAGRAPH44" class='ladi-element'>
                      <div class='ladi-paragraph'>CTO &amp; Co-founder<br>VBI Academy<br></div>
                    </div>
                    <div id="PARAGRAPH45" class='ladi-element'>
                      <div class='ladi-paragraph'>Mr. Đinh Ngọc Thạnh<br></div>
                    </div>
                    <div id="IMAGE40" class='ladi-element'>
                      <div class='ladi-image'>
                        <div class="ladi-image-background"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="BUTTON_GROUP3" class='ladi-element'>
                  <div class='ladi-button-group'><a href="https://www.linkedin.com/in/ngocthanhdinh/" target="_blank"
                      id="BUTTON22" class='ladi-element'>
                      <div class='ladi-button'>
                        <div class="ladi-button-background"></div>
                        <div id="BUTTON_TEXT22" class='ladi-element ladi-button-headline'>
                          <p class='ladi-headline'>LinkedIn</p>
                        </div>
                      </div>
                    </a></div>
                </div>
                <div id="LINE8" class='ladi-element'>
                  <div class='ladi-line'>
                    <div class="ladi-line-container"></div>
                  </div>
                </div>
                <div id="LINE9" class='ladi-element'>
                  <div class='ladi-line'>
                    <div class="ladi-line-container"></div>
                  </div>
                </div>
                <div data-action="true" id="GROUP58" class='ladi-element'>
                  <div class='ladi-group'>
                    <div id="LINE7" class='ladi-element'>
                      <div class='ladi-line'>
                        <div class="ladi-line-container"></div>
                      </div>
                    </div>
                    <div id="BUTTON_GROUP2" class='ladi-element'>
                      <div class='ladi-button-group'><a href="https://x.com/PhamHuong_GFI" target="_blank" id="BUTTON18"
                          class='ladi-element'>
                          <div class='ladi-button'>
                            <div class="ladi-button-background"></div>
                            <div id="BUTTON_TEXT18" class='ladi-element ladi-button-headline'>
                              <p class='ladi-headline'>X</p>
                            </div>
                          </div>
                        </a></div>
                    </div>
                    <div id="PARAGRAPH41" class='ladi-element'>
                      <div class='ladi-paragraph'>CEO &amp; Co-founder<br>GFI Ventures<br></div>
                    </div>
                    <div id="PARAGRAPH42" class='ladi-element'>
                      <div class='ladi-paragraph'>Mr. Phạm Hưởng</div>
                    </div>
                    <div id="GROUP51" class='ladi-element'>
                      <div class='ladi-group'>
                        <div id="BOX9" class='ladi-element'>
                          <div class='ladi-box ladi-transition'></div>
                        </div>
                        <div id="IMAGE41" class='ladi-element'>
                          <div class='ladi-image'>
                            <div class="ladi-image-background"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="PARAGRAPH61" class='ladi-element'>
                  <div class='ladi-paragraph'>Người hướng dẫn<br></div>
                </div>
                <div data-action="true" id="GROUP59" class='ladi-element'>
                  <div class='ladi-group'>
                    <div id="LINE10" class='ladi-element'>
                      <div class='ladi-line'>
                        <div class="ladi-line-container"></div>
                      </div>
                    </div>
                    <div id="BUTTON_GROUP4" class='ladi-element'>
                      <div class='ladi-button-group'><a href="https://www.linkedin.com/in/jayden-dangvu/" target="_blank"
                          id="BUTTON25" class='ladi-element'>
                          <div class='ladi-button'>
                            <div class="ladi-button-background"></div>
                            <div id="BUTTON_TEXT25" class='ladi-element ladi-button-headline'>
                              <p class='ladi-headline'>LinkedIn</p>
                            </div>
                          </div>
                        </a></div>
                    </div>
                    <div id="PARAGRAPH63" class='ladi-element'>
                      <div class='ladi-paragraph'>Giảng viên tại VBI Academy<br>Dev Relations tại Movement Labs<br></div>
                    </div>
                    <div id="PARAGRAPH64" class='ladi-element'>
                      <div class='ladi-paragraph'>Mr. Quang Vũ</div>
                    </div>
                    <div id="GROUP60" class='ladi-element'>
                      <div class='ladi-group'>
                        <div id="BOX14" class='ladi-element'>
                          <div class='ladi-box ladi-transition'></div>
                        </div>
                        <div id="IMAGE47" class='ladi-element'>
                          <div class='ladi-image'>
                            <div class="ladi-image-background"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div data-action="true" id="GROUP61" class='ladi-element'>
                  <div class='ladi-group'>
                    <div id="LINE11" class='ladi-element'>
                      <div class='ladi-line'>
                        <div class="ladi-line-container"></div>
                      </div>
                    </div>
                    <div id="BUTTON_GROUP5" class='ladi-element'>
                      <div class='ladi-button-group'><a href="https://www.linkedin.com/in/terrancrypt/" target="_blank"
                          id="BUTTON26" class='ladi-element'>
                          <div class='ladi-button'>
                            <div class="ladi-button-background"></div>
                            <div id="BUTTON_TEXT26" class='ladi-element ladi-button-headline'>
                              <p class='ladi-headline'>LinkedIn</p>
                            </div>
                          </div>
                        </a></div>
                    </div>
                    <div id="PARAGRAPH65" class='ladi-element'>
                      <div class='ladi-paragraph'>Giảng viên tại VBI Academy<br>Blockchain Lead tại OpenEdu<br></div>
                    </div>
                    <div id="PARAGRAPH66" class='ladi-element'>
                      <div class='ladi-paragraph'>Mr. Ngọc Tường</div>
                    </div>
                    <div id="GROUP62" class='ladi-element'>
                      <div class='ladi-group'>
                        <div id="BOX15" class='ladi-element'>
                          <div class='ladi-box ladi-transition'></div>
                        </div>
                        <div id="IMAGE48" class='ladi-element'>
                          <div class='ladi-image'>
                            <div class="ladi-image-background"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="BUTTON_GROUP6" class='ladi-element'>
                  <div class='ladi-button-group'><a href="https://www.facebook.com/terrancrypt/" target="_blank" id="BUTTON27"
                      class='ladi-element'>
                      <div class='ladi-button'>
                        <div class="ladi-button-background"></div>
                        <div id="BUTTON_TEXT27" class='ladi-element ladi-button-headline'>
                          <p class='ladi-headline'>Facebook</p>
                        </div>
                      </div>
                    </a></div>
                </div>
              </div>
            </div>
            <div id="FAQ" class='ladi-section'>
              <div class='ladi-section-background'></div>
              <div class="ladi-container">
                <div id="HEADLINE41" class='ladi-element'>
                  <h2 class='ladi-headline'>FAQ<br></h2>
                </div>
                <div data-action="true" id="BUTTON12" class='ladi-element'>
                  <div class='ladi-button ladi-transition'>
                    <div class="ladi-button-background"></div>
                    <div id="BUTTON_TEXT12" class='ladi-element ladi-button-headline'>
                      <p class='ladi-headline ladi-transition'>Tham gia ngay</p>
                    </div>
                  </div>
                </div>
                <div id="ACCORDION8" class='ladi-element'>
                  <div class='ladi-accordion'>
                    <div id="ACCORDION_CONTENT39" class='ladi-element'>
                      <div class='ladi-frame ladi-frame-bg'>
                        <div class="ladi-frame-background"></div>
                        <div id="PARAGRAPH23" class='ladi-element'>
                          <div class='ladi-paragraph'>Kiến thức cơ bản về lập trình là cần thiết. Kinh nghiệm với các ngôn ngữ
                            như Python, JavaScript hoặc Haskell sẽ có lợi nhưng không bắt buộc.</div>
                        </div>
                      </div>
                    </div>
                    <div data-action="true" id="ACCORDION_MENU40" class='ladi-element accordion-menu'>
                      <div class='ladi-frame ladi-frame-bg'>
                        <div class="ladi-frame-background"></div>
                        <div id="ACCORDION_SHAPE30" class='ladi-element ladi-accordion-shape'>
                          <div class='ladi-shape'><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                              preserveAspectRatio="none" viewBox="0 0 24 24" class="" fill="#000">
                              <use xlink:href="#shape_vyaDwfXQCs"></use>
                            </svg></div>
                        </div>
                        <div id="HEADLINE60" class='ladi-element'>
                          <h6 class='ladi-headline'>Tôi cần có kiến thức nền tảng gì để tham gia khóa học?<br></h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="ACCORDION11" class='ladi-element'>
                  <div class='ladi-accordion'>
                    <div id="ACCORDION_CONTENT45" class='ladi-element'>
                      <div class='ladi-frame ladi-frame-bg'>
                        <div class="ladi-frame-background"></div>
                        <div id="PARAGRAPH26" class='ladi-element'>
                          <div class='ladi-paragraph'>Khóa học hoàn toàn miễn phí. Không những vậy, bạn hoàn toàn có thể nhận
                            phần thưởng khi hoàn thành xong khóa học.</div>
                        </div>
                      </div>
                    </div>
                    <div data-action="true" id="ACCORDION_MENU46" class='ladi-element accordion-menu'>
                      <div class='ladi-frame ladi-frame-bg'>
                        <div class="ladi-frame-background"></div>
                        <div id="ACCORDION_SHAPE33" class='ladi-element ladi-accordion-shape'>
                          <div class='ladi-shape'><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                              preserveAspectRatio="none" viewBox="0 0 24 24" class="" fill="#000">
                              <use xlink:href="#shape_vyaDwfXQCs"></use>
                            </svg></div>
                        </div>
                        <div id="HEADLINE63" class='ladi-element'>
                          <h6 class='ladi-headline'>Học phí là bao nhiêu?<br></h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="ACCORDION10" class='ladi-element'>
                  <div class='ladi-accordion'>
                    <div id="ACCORDION_CONTENT43" class='ladi-element'>
                      <div class='ladi-frame ladi-frame-bg'>
                        <div class="ladi-frame-background"></div>
                        <div id="PARAGRAPH25" class='ladi-element'>
                          <div class='ladi-paragraph'>Bạn sẽ nhận được chứng chỉ hoàn thành Bootcamp được cấp bởi học viên VBI
                            và Cardano Foundation ngay sau khi hoàn thành khóa học</div>
                        </div>
                      </div>
                    </div>
                    <div data-action="true" id="ACCORDION_MENU44" class='ladi-element accordion-menu'>
                      <div class='ladi-frame ladi-frame-bg'>
                        <div class="ladi-frame-background"></div>
                        <div id="ACCORDION_SHAPE32" class='ladi-element ladi-accordion-shape'>
                          <div class='ladi-shape'><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                              preserveAspectRatio="none" viewBox="0 0 24 24" class="" fill="#000">
                              <use xlink:href="#shape_vyaDwfXQCs"></use>
                            </svg></div>
                        </div>
                        <div id="HEADLINE62" class='ladi-element'>
                          <h6 class='ladi-headline'>Khóa học có cấp chứng chỉ không?<br></h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="ACCORDION7" class='ladi-element'>
                  <div class='ladi-accordion'>
                    <div id="ACCORDION_CONTENT37" class='ladi-element'>
                      <div class='ladi-frame ladi-frame-bg'>
                        <div class="ladi-frame-background"></div>
                        <div id="PARAGRAPH22" class='ladi-element'>
                          <div class='ladi-paragraph'>Khóa học phù hợp cho cả người mới bắt đầu và các nhà phát triển có kinh
                            nghiệm muốn học về phát triển hợp đồng thông minh trên nền tảng Cardano.</div>
                        </div>
                      </div>
                    </div>
                    <div data-action="true" id="ACCORDION_MENU38" class='ladi-element accordion-menu'>
                      <div class='ladi-frame ladi-frame-bg'>
                        <div class="ladi-frame-background"></div>
                        <div id="ACCORDION_SHAPE29" class='ladi-element ladi-accordion-shape'>
                          <div class='ladi-shape'><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                              preserveAspectRatio="none" viewBox="0 0 24 24" class="" fill="#000">
                              <use xlink:href="#shape_vyaDwfXQCs"></use>
                            </svg></div>
                        </div>
                        <div id="HEADLINE59" class='ladi-element'>
                          <h6 class='ladi-headline'>Khóa học này dành cho ai?<br><br></h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="ACCORDION9" class='ladi-element'>
                  <div class='ladi-accordion'>
                    <div id="ACCORDION_CONTENT41" class='ladi-element'>
                      <div class='ladi-frame ladi-frame-bg'>
                        <div class="ladi-frame-background"></div>
                        <div id="PARAGRAPH24" class='ladi-element'>
                          <div class='ladi-paragraph'>Bạn sẽ học về Cardano, ngôn ngữ Aiken, Plutus, phát triển hợp đồng thông
                            minh on-chain và off-chain, và cách xây dựng các ứng dụng thực tế trên Cardano.</div>
                        </div>
                      </div>
                    </div>
                    <div data-action="true" id="ACCORDION_MENU42" class='ladi-element accordion-menu'>
                      <div class='ladi-frame ladi-frame-bg'>
                        <div class="ladi-frame-background"></div>
                        <div id="ACCORDION_SHAPE31" class='ladi-element ladi-accordion-shape'>
                          <div class='ladi-shape'><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                              preserveAspectRatio="none" viewBox="0 0 24 24" class="" fill="#000">
                              <use xlink:href="#shape_vyaDwfXQCs"></use>
                            </svg></div>
                        </div>
                        <div id="HEADLINE61" class='ladi-element'>
                          <h6 class='ladi-headline'>Tôi sẽ học những gì trong khóa học này?<br></h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="FOOTER" class='ladi-section'>
              <div class='ladi-section-background'></div>
              <div class="ladi-overlay"></div>
              <div class="ladi-container">
                <div data-action="true" id="GROUP41" class='ladi-element'>
                  <div class='ladi-group'>
                    <div id="HEADLINE45" class='ladi-element'>
                      <h4 class='ladi-headline'>VBI Academy là học viện đào tạo lập trình Blockchain và Web3 lớn nhất Việt Nam.
                      </h4>
                    </div>
                    <div id="IMAGE28" class='ladi-element'>
                      <div class='ladi-image'>
                        <div class="ladi-image-background"></div>
                      </div>
                    </div><a href="https://zalo.me/4407174189230641037" target="_blank" id="GROUP29" class='ladi-element'>
                      <div class='ladi-group'>
                        <div id="HEADLINE51" class='ladi-element'>
                          <p class='ladi-headline'>VBI Official Zalo OA</p>
                        </div>
                        <div id="SHAPE22" class='ladi-element'>
                          <div class='ladi-shape'><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                              preserveAspectRatio="none" viewBox="0 0 32 32" class="" fill="rgb(39, 39, 39)">
                              <use xlink:href="#shape_DExBOlsOub"></use>
                            </svg></div>
                        </div>
                      </div>
                    </a><a href="https://www.facebook.com/VBIAcademy" target="_blank" id="GROUP36" class='ladi-element'>
                      <div class='ladi-group'>
                        <div id="HEADLINE52" class='ladi-element'>
                          <p class='ladi-headline'>VBI FB Page</p>
                        </div>
                        <div id="SHAPE23" class='ladi-element'>
                          <div class='ladi-shape'><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                              preserveAspectRatio="none" viewBox="0 0 32 32" class="" fill="rgb(39, 39, 39)">
                              <use xlink:href="#shape_ruYIeHWFBO"></use>
                            </svg></div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div data-action="true" id="GROUP42" class='ladi-element'>
                  <div class='ladi-group'>
                    <div id="IMAGE29" class='ladi-element'>
                      <div class='ladi-image'>
                        <div class="ladi-image-background"></div>
                      </div>
                    </div>
                    <div id="PARAGRAPH27" class='ladi-element'>
                      <div class='ladi-paragraph'>Cardano Foundation là một tổ chức phi lợi nhuận nhằm phát triển hệ sinh thái
                        Cardano.</div>
                    </div><a href="https://cardanofoundation.org/" target="_blank" id="GROUP38" class='ladi-element'>
                      <div class='ladi-group'>
                        <div id="HEADLINE75" class='ladi-element'>
                          <p class='ladi-headline'>Cardano Foundation Website</p>
                        </div>
                        <div id="SHAPE34" class='ladi-element'>
                          <div class='ladi-shape'><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                              preserveAspectRatio="none" viewBox="0 0 24 24" class="" fill="rgb(39, 39, 39)">
                              <path
                                d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z">
                              </path>
                            </svg></div>
                        </div>
                      </div>
                    </a><a href="https://www.facebook.com/CardanoFoundation/" target="_blank" id="GROUP39" class='ladi-element'>
                      <div class='ladi-group'>
                        <div id="HEADLINE76" class='ladi-element'>
                          <p class='ladi-headline'>Cardano Foundation FB Page</p>
                        </div>
                        <div id="SHAPE35" class='ladi-element'>
                          <div class='ladi-shape'><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                              preserveAspectRatio="none" viewBox="0 0 32 32" class="" fill="rgb(39, 39, 39)">
                              <use xlink:href="#shape_ruYIeHWFBO"></use>
                            </svg></div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div data-action="true" id="GROUP43" class='ladi-element'>
                  <div class='ladi-group'><a href="https://zalo.me/g/zvzndd519" target="_blank" id="GROUP31"
                      class='ladi-element'>
                      <div class='ladi-group'>
                        <div id="HEADLINE53" class='ladi-element'>
                          <p class='ladi-headline'>Zalo Group cộng đồng học viên&nbsp;<br></p>
                        </div>
                        <div id="SHAPE24" class='ladi-element'>
                          <div class='ladi-shape'><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                              preserveAspectRatio="none" viewBox="0 0 32 32" class="" fill="rgb(39, 39, 39)">
                              <use xlink:href="#shape_DExBOlsOub"></use>
                            </svg></div>
                        </div>
                      </div>
                    </a><a href="https://discord.gg/wxGSWxzuNQ" target="_blank" id="GROUP37" class='ladi-element'>
                      <div class='ladi-group'>
                        <div id="IMAGE30" class='ladi-element'>
                          <div class='ladi-image'>
                            <div class="ladi-image-background"></div>
                          </div>
                        </div>
                        <div id="HEADLINE54" class='ladi-element'>
                          <p class='ladi-headline'>Cardano Developer Vietnam</p>
                        </div>
                      </div>
                    </a>
                    <div id="PARAGRAPH28" class='ladi-element'>
                      <div class='ladi-paragraph'>Kênh cộng đồng của học viên để hỏi đáp các thắc mắc liên quan đến nội dung
                        bootcamp và chương trình hackathon.</div>
                    </div>
                    <div id="GROUP40" class='ladi-element'>
                      <div class='ladi-group'>
                        <div id="HEADLINE50" class='ladi-element'>
                          <h4 class='ladi-headline'>Kênh hỗ trợ học viên</h4>
                        </div>
                        <div id="SHAPE36" class='ladi-element'>
                          <div class='ladi-shape'><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                              preserveAspectRatio="none" viewBox="0 0 24 24" class="" fill="#000">
                              <path
                                d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z">
                              </path>
                            </svg></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="SECTION_POPUP" class='ladi-section'>
              <div class='ladi-section-background'></div>
              <div class="ladi-container">
                <div id="POPUP28" class='ladi-element'>
                  <div class='ladi-popup'>
                    <div class="ladi-popup-background"></div>
                    <div id="HEADLINE87" class='ladi-element'>
                      <h3 class='ladi-headline'>Cổng đăng ký sẽ được mở vào ngày <span
                          style="font-size: 26px;">05/11/2024</span></h3>
                    </div>
                    <div id="COUNTDOWN1" class='ladi-element'>
                      <div class='ladi-countdown'>
                        <div id="COUNTDOWN_ITEM1" class='ladi-element'>
                          <div class="ladi-countdown-background"></div>
                          <div class='ladi-countdown-text'><span>00</span></div>
                        </div>
                        <div id="COUNTDOWN_ITEM2" class='ladi-element'>
                          <div class="ladi-countdown-background"></div>
                          <div class='ladi-countdown-text'><span>00</span></div>
                        </div>
                        <div id="COUNTDOWN_ITEM3" class='ladi-element'>
                          <div class="ladi-countdown-background"></div>
                          <div class='ladi-countdown-text'><span>00</span></div>
                        </div>
                        <div id="COUNTDOWN_ITEM4" class='ladi-element'>
                          <div class="ladi-countdown-background"></div>
                          <div class='ladi-countdown-text'><span>00</span></div>
                        </div>
                      </div>
                    </div>
                    <div id="HEADLINE88" class='ladi-element'>
                      <h3 class='ladi-headline'>Ngày<br></h3>
                    </div>
                    <div id="HEADLINE89" class='ladi-element'>
                      <h3 class='ladi-headline'>Giờ<br></h3>
                    </div>
                    <div id="HEADLINE90" class='ladi-element'>
                      <h3 class='ladi-headline'>Phút</h3>
                    </div>
                    <div id="HEADLINE91" class='ladi-element'>
                      <h3 class='ladi-headline'>Bạn hãy tham gia khóa Bootcamp lập trình trên Cardano để chuẩn bị tốt nhất</h3>
                    </div><a href="https://vbi.openedu.net/courses/cardano-bootcamp-50467" target="_blank" id="BUTTON24"
                      class='ladi-element'>
                      <div class='ladi-button ladi-transition'>
                        <div class="ladi-button-background"></div>
                        <div id="BUTTON_TEXT24" class='ladi-element ladi-button-headline'>
                          <p class='ladi-headline ladi-transition'>Tham gia ngay</p>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
                <div id="POPUP_MENU_MOBILE_MENU1" data-dropbox="true" class='ladi-element'>
                  <div class='ladi-popup'>
                    <div class="ladi-popup-background"></div>
                    <div id="MENU42" class='ladi-element'>
                      <div class="ladi-menu menu-icon-item menu-icon-1 theme-1"></div>
                      <ul class="ladi-menu list-menu-items theme-1">
                        <li class='ladi-menu-item ladi-transition' data-child="false"><a
                            data-item="%7B%22action%22%3A%22HEADER%22%2C%22type%22%3A%22section%22%7D">Trang chủ</a></li>
                        <li class='ladi-menu-item ladi-transition' data-child="false"><a
                            data-item="%7B%22action%22%3A%22BOOTCAMP%22%2C%22type%22%3A%22section%22%7D">Bootcamp</a></li>
                        <li class='ladi-menu-item ladi-transition' data-child="false"><a
                            data-item="%7B%22action%22%3A%22HACKATHON%22%2C%22type%22%3A%22section%22%7D">Hackathon</a></li>
                        <li class='ladi-menu-item ladi-transition' data-child="false"><a
                            data-item="%7B%22action%22%3A%22FAQ%22%2C%22type%22%3A%22section%22%7D">FAQ</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="backdrop-popup" class="backdrop-popup"></div>
          <div id="backdrop-dropbox" class="backdrop-dropbox"></div>
          <div id="lightbox-screen" class="lightbox-screen"></div>
          <script id="script_lazyload"
            type="text/javascript">window.lazyload_run = function (dom, is_first, check_dom_rect) { if (check_dom_rect && (document.body.clientWidth <= 0 || document.body.clientheight <= 0)) { return setTimeout(function () { window.lazyload_run(dom, is_first, check_dom_rect); }, 1); } var style_lazyload = document.getElementById('style_lazyload'); var list_element_lazyload = dom.querySelectorAll('body.lazyload .ladi-overlay, body.lazyload .ladi-box, body.lazyload .ladi-button-background, body.lazyload .ladi-collection-item, body.lazyload .ladi-countdown-background, body.lazyload .ladi-form-item-background, body.lazyload .ladi-form-label-container .ladi-form-label-item.image, body.lazyload .ladi-frame-background, body.lazyload .ladi-gallery-view-item, body.lazyload .ladi-gallery-control-item, body.lazyload .ladi-headline, body.lazyload .ladi-image-background, body.lazyload .ladi-image-compare, body.lazyload .ladi-list-paragraph ul li, body.lazyload .ladi-section-background, body.lazyload .ladi-survey-option-background, body.lazyload .ladi-survey-option-image, body.lazyload .ladi-tabs-background, body.lazyload .ladi-video-background, body.lazyload .ladi-banner, body.lazyload .ladi-spin-lucky-screen, body.lazyload .ladi-spin-lucky-start'); var docEventScroll = window; for (var i = 0; i < list_element_lazyload.length; i++) { var rect = list_element_lazyload[i].getBoundingClientRect(); if (rect.x == "undefined" || rect.x == undefined || rect.y == "undefined" || rect.y == undefined) { rect.x = rect.left; rect.y = rect.top; } var offset_top = rect.y + window.scrollY; if (offset_top >= window.scrollY + window.innerHeight || window.scrollY >= offset_top + list_element_lazyload[i].offsetHeight) { list_element_lazyload[i].classList.add('ladi-lazyload'); } } if (typeof style_lazyload != "undefined" && style_lazyload != undefined) { style_lazyload.parentElement.removeChild(style_lazyload); } document.body.classList.remove("lazyload"); var currentScrollY = window.scrollY; var stopLazyload = function (event) { if (event.type == "scroll" && window.scrollY == currentScrollY) { currentScrollY = -1; return; } docEventScroll.removeEventListener('scroll', stopLazyload); list_element_lazyload = document.getElementsByClassName('ladi-lazyload'); while (list_element_lazyload.length > 0) { list_element_lazyload[0].classList.remove('ladi-lazyload'); } }; if (is_first) { var scrollEventPassive = null; try { var opts = Object.defineProperty({}, 'passive', { get: function () { scrollEventPassive = { passive: true }; } }); window.addEventListener('testPassive', null, opts); window.removeEventListener('testPassive', null, opts); } catch (e) { } docEventScroll.addEventListener('scroll', stopLazyload, scrollEventPassive); } return dom; }; window.lazyload_run(document, true, true);</script>
          <!--[if lt IE 9]><script src="https://w.ladicdn.com/v4/source/html5shiv.min.js?v=1727777324061"></script><script src="https://w.ladicdn.com/v4/source/respond.min.js?v=1727777324061"></script><![endif]-->
          <script src="https://w.ladicdn.com/v4/source/ladipagev3.min.js?v=1727777324061" type="text/javascript"></script>
          <script id="script_event_data"
            type="application/json">{"BUTTON3":{"a":"button","cs":[{"dr":"action","dv":"_blank","dw":"https://vbi.openedu.net/courses/cardano-bootcamp-50467","a":"link"}],"cm":"click_hackathon"},"BUTTON8":{"a":"button","cs":[{"dr":"action","dv":"_blank","dw":"https://vbi.openedu.net/courses/cardano-bootcamp-50467","a":"link"}]},"MENU1":{"a":"menu","cs":[{"child":[],"dr":"menu","dw":"HEADER","a":"section","dW":"Trang chủ"},{"child":[],"dr":"menu","dw":"BOOTCAMP","a":"section","dW":"Bootcamp"},{"child":[],"dr":"menu","dw":"HACKATHON","a":"section","dW":"Hackathon"},{"child":[],"dr":"menu","dw":"FAQ","a":"section","dW":"FAQ"}]},"HEADER":{"a":"section","aD":true,"aA":"top","aw":"0px","aq":"0px"},"GROUP29":{"a":"group","cs":[{"dr":"action","dv":"_blank","dw":"https://zalo.me/4407174189230641037","a":"link"}]},"GROUP31":{"a":"group","cs":[{"dr":"action","dv":"_blank","dw":"https://zalo.me/g/zvzndd519","a":"link"}],"cm":"click_zalo_group"},"BUTTON11":{"a":"button","cs":[{"dr":"action","dv":"_blank","dw":"https://vbi.openedu.net/courses/cardano-bootcamp-50467","a":"link"}],"cm":"click_hackathon"},"ACCORDION_SHAPE29":{"a":"shape","aO":true,"g":"&#60;svg xmlns=&#34;http://www.w3.org/2000/svg&#34; width=&#34;100%&#34; height=&#34;100%&#34; preserveAspectRatio=&#34;none&#34; viewBox=&#34;0 0 24 24&#34; class=&#34;&#34; fill=&#34;#000&#34;&#62; &#60;path d=&#34;M19,13H5V11H19V13Z&#34;&#62;&#60;/path&#62; &#60;/svg&#62;"},"ACCORDION_MENU38":{"a":"frame","cs":[{"dr":"action","dw":"ACCORDION_CONTENT37","dG":true,"a":"collapse"}]},"ACCORDION_SHAPE30":{"a":"shape","aO":true,"g":"&#60;svg xmlns=&#34;http://www.w3.org/2000/svg&#34; width=&#34;100%&#34; height=&#34;100%&#34; preserveAspectRatio=&#34;none&#34; viewBox=&#34;0 0 24 24&#34; class=&#34;&#34; fill=&#34;#000&#34;&#62; &#60;path d=&#34;M19,13H5V11H19V13Z&#34;&#62;&#60;/path&#62; &#60;/svg&#62;"},"ACCORDION_MENU40":{"a":"frame","cs":[{"dr":"action","dw":"ACCORDION_CONTENT39","dG":true,"a":"collapse"}]},"ACCORDION_SHAPE31":{"a":"shape","aO":true,"g":"&#60;svg xmlns=&#34;http://www.w3.org/2000/svg&#34; width=&#34;100%&#34; height=&#34;100%&#34; preserveAspectRatio=&#34;none&#34; viewBox=&#34;0 0 24 24&#34; class=&#34;&#34; fill=&#34;#000&#34;&#62; &#60;path d=&#34;M19,13H5V11H19V13Z&#34;&#62;&#60;/path&#62; &#60;/svg&#62;"},"ACCORDION_MENU42":{"a":"frame","cs":[{"dr":"action","dw":"ACCORDION_CONTENT41","dG":true,"a":"collapse"}]},"ACCORDION_SHAPE32":{"a":"shape","aO":true,"g":"&#60;svg xmlns=&#34;http://www.w3.org/2000/svg&#34; width=&#34;100%&#34; height=&#34;100%&#34; preserveAspectRatio=&#34;none&#34; viewBox=&#34;0 0 24 24&#34; class=&#34;&#34; fill=&#34;#000&#34;&#62; &#60;path d=&#34;M19,13H5V11H19V13Z&#34;&#62;&#60;/path&#62; &#60;/svg&#62;"},"ACCORDION_MENU44":{"a":"frame","cs":[{"dr":"action","dw":"ACCORDION_CONTENT43","dG":true,"a":"collapse"}]},"ACCORDION_SHAPE33":{"a":"shape","aO":true,"g":"&#60;svg xmlns=&#34;http://www.w3.org/2000/svg&#34; width=&#34;100%&#34; height=&#34;100%&#34; preserveAspectRatio=&#34;none&#34; viewBox=&#34;0 0 24 24&#34; class=&#34;&#34; fill=&#34;#000&#34;&#62; &#60;path d=&#34;M19,13H5V11H19V13Z&#34;&#62;&#60;/path&#62; &#60;/svg&#62;"},"ACCORDION_MENU46":{"a":"frame","cs":[{"dr":"action","dw":"ACCORDION_CONTENT45","dG":true,"a":"collapse"}]},"GROUP36":{"a":"group","cs":[{"dr":"action","dv":"_blank","dw":"https://www.facebook.com/VBIAcademy","a":"link"}]},"GROUP37":{"a":"group","cs":[{"dr":"action","dv":"_blank","dw":"https://discord.gg/wxGSWxzuNQ","a":"link"}],"cm":"click_discord"},"GROUP38":{"a":"group","cs":[{"dr":"action","dv":"_blank","dw":"https://cardanofoundation.org/","a":"link"}]},"GROUP39":{"a":"group","cs":[{"dr":"action","dv":"_blank","dw":"https://www.facebook.com/CardanoFoundation/","a":"link"}]},"BUTTON12":{"a":"button","cs":[{"dw":"SECTION621","dr":"action","a":"section"}],"cm":"click_bootcamp"},"BUTTON13":{"a":"button","cs":[{"dr":"action","dv":"_blank","dw":"https://vbi.openedu.net/courses/cardano-bootcamp-50467","a":"link"}],"cm":"click_hackathon"},"SECTION16":{"a":"section","aE":true},"ACCORDION_SHAPE37":{"a":"shape","aO":true,"g":"&#60;svg xmlns=&#34;http://www.w3.org/2000/svg&#34; width=&#34;100%&#34; height=&#34;100%&#34; preserveAspectRatio=&#34;none&#34; viewBox=&#34;0 0 24 24&#34; class=&#34;&#34; fill=&#34;#000&#34;&#62; &#60;path d=&#34;M19,13H5V11H19V13Z&#34;&#62;&#60;/path&#62; &#60;/svg&#62;"},"ACCORDION_MENU49":{"a":"frame","cs":[{"dr":"action","dw":"ACCORDION_CONTENT48","dG":true,"a":"collapse"}]},"ACCORDION_SHAPE38":{"a":"shape","aO":true,"g":"&#60;svg xmlns=&#34;http://www.w3.org/2000/svg&#34; width=&#34;100%&#34; height=&#34;100%&#34; preserveAspectRatio=&#34;none&#34; viewBox=&#34;0 0 24 24&#34; class=&#34;&#34; fill=&#34;#000&#34;&#62; &#60;path d=&#34;M19,13H5V11H19V13Z&#34;&#62;&#60;/path&#62; &#60;/svg&#62;"},"ACCORDION_MENU51":{"a":"frame","cs":[{"dr":"action","dw":"ACCORDION_CONTENT50","dG":true,"a":"collapse"}]},"ACCORDION_SHAPE39":{"a":"shape","aO":true,"g":"&#60;svg xmlns=&#34;http://www.w3.org/2000/svg&#34; width=&#34;100%&#34; height=&#34;100%&#34; preserveAspectRatio=&#34;none&#34; viewBox=&#34;0 0 24 24&#34; class=&#34;&#34; fill=&#34;#000&#34;&#62; &#60;path d=&#34;M19,13H5V11H19V13Z&#34;&#62;&#60;/path&#62; &#60;/svg&#62;"},"ACCORDION_MENU53":{"a":"frame","cs":[{"dr":"action","dw":"ACCORDION_CONTENT52","dG":true,"a":"collapse"}]},"BUTTON18":{"a":"button","cs":[{"dr":"action","dv":"_blank","dw":"https://x.com/PhamHuong_GFI","a":"link"}]},"BUTTON22":{"a":"button","cs":[{"dr":"action","dv":"_blank","dw":"https://www.linkedin.com/in/ngocthanhdinh/","a":"link"}]},"BUTTON23":{"a":"button","cs":[{"dr":"action","dw":"POPUP28","a":"popup"}],"cm":"click_hackathon"},"POPUP28":{"a":"popup","X":"default","U":"background-color: rgba(0, 0, 0, 0.5);"},"COUNTDOWN1":{"a":"countdown","bX":"endtime","bT":1730768400000},"COUNTDOWN_ITEM1":{"a":"countdown_item","bY":"day"},"COUNTDOWN_ITEM2":{"a":"countdown_item","bY":"hour"},"COUNTDOWN_ITEM3":{"a":"countdown_item","bY":"minute"},"COUNTDOWN_ITEM4":{"a":"countdown_item","bY":"seconds"},"BUTTON24":{"a":"button","cs":[{"dr":"action","dv":"_blank","dw":"https://vbi.openedu.net/courses/cardano-bootcamp-50467","a":"link"}]},"BUTTON25":{"a":"button","cs":[{"dr":"action","dv":"_blank","dw":"https://www.linkedin.com/in/jayden-dangvu/","a":"link"}]},"BUTTON26":{"a":"button","cs":[{"dr":"action","dv":"_blank","dw":"https://www.linkedin.com/in/terrancrypt/","a":"link"}]},"BUTTON27":{"a":"button","cs":[{"dr":"action","dv":"_blank","dw":"https://www.facebook.com/terrancrypt/","a":"link"}]},"MENU42":{"a":"menu","cs":[{"child":[],"dr":"menu","dw":"HEADER","a":"section","dW":"Trang chủ"},{"child":[],"dr":"menu","dw":"BOOTCAMP","a":"section","dW":"Bootcamp"},{"child":[],"dr":"menu","dw":"HACKATHON","a":"section","dW":"Hackathon"},{"child":[],"dr":"menu","dw":"FAQ","a":"section","dW":"FAQ"}]},"POPUP_MENU_MOBILE_MENU1":{"a":"popup","X":"default"}}</script>
          <script id="script_ladipage_run"
            type="text/javascript">(function () { var run = function () { if (typeof window.LadiPageScript == "undefined" || typeof window.ladi == "undefined" || window.ladi == undefined) { setTimeout(run, 100); return; } window.LadiPageApp = window.LadiPageApp || new window.LadiPageAppV2(); window.LadiPageScript.runtime.ladipage_id = '66e01ac5d6516b00130a3de7'; window.LadiPageScript.runtime.publish_platform = 'LADIPAGEDNS'; window.LadiPageScript.runtime.version = '1727777324061'; window.LadiPageScript.runtime.cdn_url = 'https://w.ladicdn.com/v4/source/'; window.LadiPageScript.runtime.DOMAIN_SET_COOKIE = ["openedu101.com"]; window.LadiPageScript.runtime.DOMAIN_FREE = ["preview.ldpdemo.com", "ldp.page"]; window.LadiPageScript.runtime.bodyFontSize = 12; window.LadiPageScript.runtime.store_id = ""; window.LadiPageScript.runtime.payment_setting = { "list_payment": [], "thankyou_type": null, "thankyou_value": null }; window.LadiPageScript.runtime.time_zone = 7; window.LadiPageScript.runtime.currency = "VND"; window.LadiPageScript.runtime.convert_replace_str = true; window.LadiPageScript.runtime.desktop_width = 1200; window.LadiPageScript.runtime.mobile_width = 420; window.LadiPageScript.runtime.tracking_button_click = true; window.LadiPageScript.runtime.publish_time = 1727850713188; window.LadiPageScript.runtime.lang = "vi"; window.LadiPageScript.run(true); window.LadiPageScript.runEventScroll(); }; run(); })();</script>
        </body>

        </html><!--Publish time: Wed, 02 Oct 2024 06:31:53 GMT--><!--LadiPage build time: Tue, 01 Oct 2024 10:08:44 GMT-->
      `;
    }
  }, []);

  return <iframe title="external" ref={iframeRef} style={{ width: '100%', height: '100vh', border: 'none' }} />;
}
