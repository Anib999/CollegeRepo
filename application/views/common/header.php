<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Language" content="en">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>CollegeRepo | <?= $title ?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no" />
  <meta name="msapplication-tap-highlight" content="no">
  <link rel="icon" href="<?= base_url('assets/images/sma.png') ?>">
  <link href="<?= base_url('assets/css/main.css') ?>" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link href="<?= base_url('assets/css/appmain.css') ?>" rel="stylesheet">
  <script src="<?= base_url('assets/js/datatables/jquery.min.js') ?>" charset="utf-8"></script>
  <script src="<?= base_url('assets/js/sweetalert/sweetalert2.js') ?>" charset="utf-8"></script>
</head>
<body>
  <input type="hidden" id="base_url" name="" value="<?= base_url() ?>" style="display:none;">
  <div class="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header closed-sidebar">
    <div class="app-header header-shadow">
      <div class="app-header__logo">
        <a href="<?= base_url('Dashboard/index') ?>">
          <img src="<?= base_url('assets/images/repo.png') ?>" class="smalllogo" alt="" style="height:85px;width:140px;">
        </a>
        <div class="header__pane ml-auto">
          <div>
            <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="app-header__mobile-menu">
        <div>
          <button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </div>
      <div class="app-header__menu">
        <span>
          <button type="button" class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
            <span class="btn-icon-wrapper">
              <i class="fa fa-ellipsis-v fa-w-6"></i>
            </span>
          </button>
        </span>
      </div>
      <div class="app-header__content">
        <div class="app-header-left">
          <div class="search-wrapper">
            <div class="input-holder">
              <input type="text" class="search-input" placeholder="Type to search">
              <button class="search-icon"><span></span></button>
            </div>
            <button class="close"></button>
          </div>
          <ul class="header-menu nav">
            <li class="nav-item">
              <a href="javascript:void(0);" class="nav-link">
                <i class="nav-link-icon fa fa-database"> </i>
                Statistics
              </a>
            </li>
            <li class="btn-group nav-item">
              <a href="<?= base_url('Dashboard/projects') ?>" class="nav-link">
                <i class="nav-link-icon fa fa-edit"></i>
                Projects
              </a>
            </li>
            <li class="dropdown nav-item">
              <a href="<?= base_url('Tools/settings') ?>" class="nav-link">
                <i class="nav-link-icon fa fa-cog"></i>
                Settings
              </a>
            </li>
          </ul>
        </div>
        <div class="app-header-right">
          <div class="header-btn-lg pr-0">
            <div class="widget-content p-0">
              <div class="widget-content-wrapper">
                <div class="widget-content-left">
                  <div class="btn-group">
                    <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="p-0 btn">
                      <img width="42" class="rounded-circle" src="<?= base_url('assets/images/10.jpg') ?>" alt="">
                      <i class="fa fa-angle-down ml-2 opacity-8"></i>
                    </a>
                    <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu dropdown-menu-right">
                      <a href="<?= base_url('Dashboard/userprofile') ?>" class="nav-link">
                        <button type="button" tabindex="0" class="dropdown-item">User Account</button>
                      </a>
                      <a href="<?= base_url('Login/logout') ?>" class="nav-link">
                        <button type="button" tabindex="0" class="dropdown-item">Log Out</button>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="widget-content-left  ml-3 header-user-info">
                  <div class="widget-heading">
                    <?= $this->session->userdata('username') ?>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="scrollbar-container">
    </div>

    <div class="app-main">
      <div class="app-sidebar sidebar-shadow">
        <div class="app-header__logo">
          <div class="logo-src"></div>
          <div class="header__pane ml-auto">
            <div>
              <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                <span class="hamburger-box">
                  <span class="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div class="app-header__mobile-menu">
          <div>
            <button type="button" class="hamburger hamburger--elastic mobile-toggle-nav">
              <span class="hamburger-box">
                <span class="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
        <div class="app-header__menu">
          <span>
            <button type="button" class="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
              <span class="btn-icon-wrapper">
                <i class="fa fa-ellipsis-v fa-w-6"></i>
              </span>
            </button>
          </span>
        </div>    <div class="scrollbar-sidebar">
          <div class="app-sidebar__inner">
            <ul class="vertical-nav-menu">
              <li class="app-sidebar__heading">Dashboard</li>
              <li>
                <a href="<?= base_url('Dashboard/index') ?>" class="<?php if(isset($activeclass)){ echo $activeclass; } ?>">
                  <i class="metismenu-icon pe-7s-home"></i>
                  Dashboard
                </a>
              </li>
              <li class="app-sidebar__heading">Users</li>
              <li>
                <a href="#">
                  <i class="metismenu-icon pe-7s-user"></i>
                  Students/Teachers
                  <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                </a>
                <ul>
                  <li>
                    <a href="<?= base_url('Users/students') ?>">
                      <i class="metismenu-icon"></i>
                      Students
                    </a>
                  </li>
                  <li>
                    <a href="<?= base_url('Users/teachers') ?>">
                      <i class="metismenu-icon"></i>
                      Teachers
                    </a>
                  </li>
                  <li>
                    <a href="<?= base_url('Users/viewAllUsers') ?>">
                      <i class="metismenu-icon"></i>
                      View All Users
                    </a>
                  </li>
                </ul>
              </li>
              <li class="app-sidebar__heading">File Manager</li>
              <li>
                <a href="#">
                  <i class="metismenu-icon pe-7s-cloud-upload"></i>
                  Upload/Download
                  <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                </a>
                <ul>
                  <li>
                    <a href="<?= base_url('FileManager/uploadfile') ?>">
                      <i class="metismenu-icon"></i>
                      Upload files
                    </a>
                  </li>
                  <li>
                    <a href="<?= base_url('FileManager/downloadfile') ?>">
                      <i class="metismenu-icon"></i>
                      Download files
                    </a>
                  </li>
                  <li>
                    <a href="<?= base_url('FileManager/managefile') ?>">
                      <i class="metismenu-icon"></i>
                      Manage Files
                    </a>
                  </li>
                </ul>
              </li>
              <li class="app-sidebar__heading">Tools</li>
              <li>
                <a href="#">
                  <i class="metismenu-icon pe-7s-help1"></i>
                  About Us
                  <i class="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                </a>
                <ul>
                  <li>
                    <a href="<?= base_url('Tools/settings') ?>">
                      <i class="metismenu-icon"></i>
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="<?= base_url('Tools/help') ?>">
                      <i class="metismenu-icon"></i>
                      Help
                    </a>
                  </li>
                  <li>
                    <a href="<?= base_url('Tools/aboutus') ?>">
                      <i class="metismenu-icon"></i>
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="<?= base_url('Tools/usermanual') ?>">
                      <i class="metismenu-icon"></i>
                      User Manual
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="app-main__outer">
        <div class="app-main__inner">
          <div class="app-page-title">
            <div class="page-title-wrapper">
              <div class="page-title-heading">
                <div class="page-title-icon">
                  <i class="<?= $icon ?>">
                  </i>
                </div>
                <div><?= $title ?>
                  <div class="page-title-subheading">
                  </div>
                </div>
              </div>
              <div class="page-title-actions">
                <button type="button" data-toggle="tooltip" title="Example Tooltip" data-placement="bottom" class="btn-shadow mr-3 btn btn-dark">
                  <i class="fa fa-star"></i>
                </button>
                <div class="d-inline-block dropdown">
                  <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn-shadow dropdown-toggle btn btn-info">
                    <span class="btn-icon-wrapper pr-2 opacity-7">
                      <!-- <i class="fa fa-business-time fa-w-20"></i> -->
                    </span>
                    Buttons
                  </button>
                  <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu dropdown-menu-right">
                    <ul class="nav flex-column">
                      <li class="nav-item">
                        <a href="javascript:void(0);" class="nav-link">
                          <i class="nav-link-icon lnr-inbox"></i>
                          <span>
                            Inbox
                          </span>
                          <div class="ml-auto badge badge-pill badge-secondary">86</div>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a href="javascript:void(0);" class="nav-link">
                          <i class="nav-link-icon lnr-book"></i>
                          <span>
                            Book
                          </span>
                          <div class="ml-auto badge badge-pill badge-danger">5</div>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a href="javascript:void(0);" class="nav-link">
                          <i class="nav-link-icon lnr-picture"></i>
                          <span>
                            Picture
                          </span>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a disabled href="javascript:void(0);" class="nav-link disabled">
                          <i class="nav-link-icon lnr-file-empty"></i>
                          <span>
                            File Disabled
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
