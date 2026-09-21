<?php
// Set response content type to JSON if AJAX request
$isAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Collect & sanitize form input
    $name    = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
    $email   = isset($_POST['email']) ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL)) : '';
    $subject = isset($_POST['subject']) ? trim(strip_tags($_POST['subject'])) : '';
    $message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';

    $errors = [];

    // PHP Validations
    if (empty($name)) {
        $errors[] = "Please enter your name.";
    }

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Please enter a valid email address.";
    }

    if (empty($subject)) {
        $errors[] = "Please enter a subject.";
    }

    if (empty($message)) {
        $errors[] = "Please enter your message.";
    }

    // If validation fails
    if (!empty($errors)) {
        if ($isAjax) {
            header('Content-Type: application/json');
            echo json_encode(['status' => 'error', 'message' => implode(' ', $errors)]);
            exit;
        } else {
            echo "<script>alert('Error: " . addslashes(implode(' ', $errors)) . "'); window.history.back();</script>";
            exit;
        }
    }

    // Email Configuration
    $to = "pvanitha2109@gmail.com";
    $email_subject = "Portfolio Contact Form: " . $subject;
    
    // HTML Email Body
    $email_body = "
    <html>
    <head>
      <title>New Message from Portfolio</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; max-width: 600px; }
        .header { background: #6244C5; color: #fff; padding: 15px; border-radius: 6px 6px 0 0; text-align: center; }
        .content { padding: 20px; }
        .field { margin-bottom: 12px; }
        .label { font-weight: bold; color: #6244C5; }
      </style>
    </head>
    <body>
      <div class='container'>
        <div class='header'>
          <h2>New Contact Inquiry</h2>
        </div>
        <div class='content'>
          <div class='field'><span class='label'>Name:</span> " . htmlspecialchars($name) . "</div>
          <div class='field'><span class='label'>Email:</span> " . htmlspecialchars($email) . "</div>
          <div class='field'><span class='label'>Subject:</span> " . htmlspecialchars($subject) . "</div>
          <div class='field'><span class='label'>Message:</span><br>" . nl2br(htmlspecialchars($message)) . "</div>
        </div>
      </div>
    </body>
    </html>
    ";

    // Headers
    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Portfolio Contact Form <noreply@" . ($_SERVER['SERVER_NAME'] ?? 'yourdomain.com') . ">" . "\r\n";
    $headers .= "Reply-To: " . $name . " <" . $email . ">" . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send Mail
    if (@mail($to, $email_subject, $email_body, $headers)) {
        if ($isAjax) {
            header('Content-Type: application/json');
            echo json_encode(['status' => 'success', 'message' => 'Thank you! Your message has been sent successfully.']);
            exit;
        } else {
            echo "<script>alert('Thank you! Your message has been sent successfully.'); window.location.href = 'index.html#contact';</script>";
            exit;
        }
    } else {
        if ($isAjax) {
            header('Content-Type: application/json');
            echo json_encode(['status' => 'error', 'message' => 'Unable to send email. Please try again later or contact directly at pvanitha2109@gmail.com']);
            exit;
        } else {
            echo "<script>alert('Unable to send email. Please try again later.'); window.history.back();</script>";
            exit;
        }
    }
} else {
    header("Location: index.html");
    exit;
}
?>
