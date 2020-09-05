<?php
// Remove all default WP template redirects/lookups
remove_action( 'template_redirect', 'redirect_canonical' );

// Redirect all requests to index.php so the Vue app is loaded and 404s aren't thrown
function remove_redirects() {
	add_rewrite_rule( '^/(.+)/?', 'index.php', 'top' );
}
add_action( 'init', 'remove_redirects' );

// Load scripts
function load_vue_scripts() {
	wp_enqueue_script(
		'vuejs-wordpress-theme-starter-js',
		get_stylesheet_directory_uri() . '/dist/scripts/index.js',
		array( 'jquery' ),
		filemtime( get_stylesheet_directory() . '/dist/scripts/index.js' ),
		true
	);

	wp_enqueue_style(
		'vuejs-wordpress-theme-starter-css',
		get_stylesheet_directory_uri() . '/dist/styles.css',
		null,
		filemtime( get_stylesheet_directory() . '/dist/styles.css' )
	);
}
add_action( 'wp_enqueue_scripts', 'load_vue_scripts', 100 );

add_theme_support( 'post-thumbnails' );

// Register Custom Post Type
function timeline_post_type() {

	$labels = array(
		'name'                  => 'Timelines',
		'singular_name'         => 'Timeline',
		'menu_name'             => 'Timelines',
		'name_admin_bar'        => 'Timelines',
		'archives'              => 'Timeline Archives',
		'attributes'            => 'Timeline Attributes',
		'parent_item_colon'     => 'Parent Timeline:',
		'all_items'             => 'All Timeline Items',
		'add_new_item'          => 'Add New Timeline Item',
		'add_new'               => 'Add New Timeline Item',
		'new_item'              => 'New Timeline Item',
		'edit_item'             => 'Edit Timeline Item',
		'update_item'           => 'Update Timeline Item',
		'view_item'             => 'View Timeline Item',
		'view_items'            => 'View Timeline Items',
		'search_items'          => 'Search Timeline Item',
		'not_found'             => 'Timeline Item Not found',
		'not_found_in_trash'    => 'Timeline Item Not found in Trash',
		'featured_image'        => 'Timeline Item Featured Image',
		'set_featured_image'    => 'Timeline Item set featured image',
		'remove_featured_image' => 'Timeline Item Remove featured image',
		'use_featured_image'    => 'Timeline Item Use as featured image',
		'insert_into_item'      => 'Timeline Item Insert into item',
		'uploaded_to_this_item' => 'Uploaded to this item',
		'items_list'            => 'Items list',
		'items_list_navigation' => 'Items list navigation',
		'filter_items_list'     => 'Filter items list',
	);
	$rewrite = array(
		'slug'                  => 'timeline',
		'with_front'            => true,
		'pages'                 => false,
		'feeds'                 => false,
	);
	$args = array(
		'label'                 => 'Timeline',
		'description'           => 'Timeline for About Page',
		'labels'                => $labels,
		'supports'              => array( 'title', 'editor', 'thumbnail' ),
		'taxonomies'            => array( 'timeline' ),
		'hierarchical'          => false,
		'public'                => true,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_icon'             => 'dashicons-calendar-alt',
		'menu_position'         => 2,
		'show_in_admin_bar'     => true,
		'show_in_nav_menus'     => true,
		'can_export'            => false,
		'has_archive'           => false,
		'exclude_from_search'   => false,
		'publicly_queryable'    => false,
		'rewrite'               => $rewrite,
		'capability_type'       => 'page',
		'show_in_rest'          => true,
		'rest_base'             => 'timeline',
		'rest_controller_class' => 'WP_REST_Posts_Controller',
	);
	register_post_type( 'timeline', $args );

}
add_action( 'init', 'timeline_post_type', 0 );


// Allow SVG Uploads
function upload_svg_files( $allowed ) {
    if ( !current_user_can( 'manage_options' ) )
        return $allowed;
    $allowed['svg'] = 'image/svg+xml';
    return $allowed;
}
add_filter( 'mime_types', 'upload_svg_files');

// Add Admin CSS to Fix SVG Preview
function admin_style() {
	echo <<<EOD
	<style>
	.components-responsive-wrapper{
		min-height: 250px;
	}
	</style>
	EOD;
}
add_action('admin_enqueue_scripts', 'admin_style');