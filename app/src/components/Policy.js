import React from 'react'
import Header from './Header'
import Footer from './Footer'
import './Policy.css'

function Policy () {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div>
      <Header />
      <div className='content_policy'>
        <div className='content_text'>
          <h2>Terms of Service</h2>
          <p>Welcome to our website K3H Health studio. By using our website, you agree to these terms of service. If you do not agree to these terms, you are not permitted to use our website.</p>
          <p>1. Introduction</p>
          <p>Welcome to K3H Health studio. These terms of service govern your use of our website. By using our website, you accept these terms of service in full. If you disagree with these terms of service or any part of these terms of service, you must not use our website.</p>
          <p>2. Changes to the Terms of Service</p>
          <p>We may revise these terms of service from time to time. The revised terms of service shall apply to the use of our website from the date of publication of the revised terms of service on our website. Please check this page regularly to ensure you are familiar with the current version.</p>
          <p>3. Age Requirement</p>
          <p>Our website is intended for persons who are at least 18 years old. If you are under 18 years old, you must have the consent of a parent or legal guardian to use our website.</p>
          <p>4. Disclaimer of Liability</p>
          <p>We do our best to ensure that all information on our website is correct and up-to-date, but we cannot guarantee its accuracy or completeness. We are not responsible for any damages that may arise from the use of our website.</p>
          <p>5. Copyright and Trademarks</p>
          <p>All material on our website, including text, images, graphics, logos, and trademarks, is protected by copyright and trademark laws. You may not use any material from our website without our express permission.</p>
          <p>6. Links to Third-Party Websites</p>
          <p>Our website may contain links to websites operated by third parties. We are not responsible for the content of these websites or for any damages that may arise from their use.</p>
          <p>7. Termination of User Account</p>
          <p>We reserve the right to terminate a user's account on our website if the user violates these terms of service.</p>
          <p>8. Applicable Law</p>
          <p>These terms of service are governed by Swedish law.</p>

          <h2>Privacy Policy</h2>
          <p>1. Collection of Personal Information</p>
          <p>We collect personal information from users of our website in order to provide our services. The personal information may include name, email address, phone number, and other information that you voluntarily provide to us.</p>
          <p>2. Use of Personal Information</p>
          <p>We use the personal information to provide our services and to communicate with users. We may also use the personal information to send information about our services or marketing materials if we have obtained your consent.</p>
          <p>3. Sharing of Personal Information</p>
          <p>We do not share personal information with third parties without your express consent, except as required by law.</p>
          <p>4. Storage of Personal Information</p>
          <p>We store the personal information for as longas it is necessary to provide our services or to fulfill our legal obligations.</p>
          <p>5. Protection of Personal Information</p>
          <p>We take appropriate technical and organizational measures to protect personal information against unauthorized access, loss, or theft.</p>
          <p>6. GDPR Rights</p>
          <p>Under GDPR, you have the right to request access to, correction, or deletion of your personal information. You also have the right to restrict the processing of your personal information or to object to the processing. If you wish to exercise any of these rights, please contact us at systemteknikhursa@gmail.com.</p>
          <p>7. Changes to the Privacy Policy</p>
          <p>We reserve the right to modify this privacy policy at any time without prior notice. By continuing to use our website after such modifications, you agree to the updated privacy policy.</p>
          <p>8. Contact Us</p>
          <p>If you have any questions or comments regarding our terms of service or privacy policy, please contact us at [contact information].</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Policy
