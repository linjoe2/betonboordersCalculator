<?php
/*
Plugin Name: AJAX Receiver
*/


add_action('admin_menu', 'ajax_receiver_menu');
function ajax_receiver_menu() {
    $parent_slug = null; // Child of null, so this menu item has no link to it in the dashboard.
    $menu_title  = "AJAX Receiver menu"; // This menu title will not be visible.
    $page_title  = "AJAX_Receiver"; // No one will visit this page.
    $menu_slug   = 'ajax_receiver'; // This is the last part of the URL you post to.
    $callback    = 'ajax_receiver_menu_content';
    add_submenu_page($parent_slug, $page_title, $menu_title, $capability, $menu_slug, $callback);
}



function ajax_receiver_menu_content() {
    // check request variables, do other logic.
    echo "This is the response to your AJAX request.";
}