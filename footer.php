
	</div><!-- .row -->
		
		</div><!-- .container -->
			
			</div><!-- #main -->

		<footer class="site-footer" <?php hybrid_attr( 'footer' ); ?>>
		
			<div class="footer-widget">
			
				<div class="container">
					
					<?php hybrid_get_sidebar( 'subsidiary' ); // Loads the sidebar/subsidiary.php template. ?>
					
				</div>
				
			</div>
				
			<div class="container">
			
				<div class="pull-left footer-menu">
				
					<?php hybrid_get_menu( 'social-footer' ); // Loads the menu/social-footer.php template. ?>
					
				</div>
					
				<div class="pull-right">
				
					<p class="copyright">
						<?php printf(
							/* Translators: 1 is current year, 2 is site name/link, 3 is WordPress name/link, and 4 is theme name/link. */
							__( 'Copyright &#169; %1$s %2$s. Powered by %3$s and %4$s.', 'inception' ), 
							date_i18n( 'Y' ), hybrid_get_site_link(), hybrid_get_wp_link(), hybrid_get_theme_link()
						); ?>
					</p><!-- .copyright -->
					
				</div>
					
			</div>
			
		<div class="scroll-to-top"><i class="fa fa-angle-up"></i></div><!-- .scroll-to-top -->

	<?php wp_footer(); // WordPress hook for loading JavaScript, toolbar, and other things in the footer. ?>
	
	</div><!-- #container -->

</body>
</html>