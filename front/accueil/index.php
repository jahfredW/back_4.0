<?php ob_start() ?>

<?php 
$content = ob_get_clean();
$title = "Mon formidable site d'exercices";
require "../common/template.php";
?>