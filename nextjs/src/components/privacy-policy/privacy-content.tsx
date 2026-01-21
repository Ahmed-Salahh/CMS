import { PolicySection } from "./policy-section";

export function PrivacyContent() {
  return (
    <div className="flex-1 flex flex-col gap-[50px] bg-white rounded-tl-[20px] p-[50px] ml-[-8px]">
      {/* US Section */}
      <PolicySection
        id="us"
        title="US"
        content={`The Academy of Financial and Accounting Excellence (referred to as "the Academy" or the possessive pronoun "our" or the first-person pronoun "we") respects the issue of privacy and is committed to protecting personal data. Your privacy is important to us, and maintaining your trust is our priority. This privacy policy (hereinafter referred to as the "Privacy Policy") governs the collection of your personal data that the Academy obtains in the course of its activities (including through our website (al-tamayyuz.com) or any mobile application (collectively referred to as "the Site")) and its use, external hosting, and disclosure.

By using the Site, you consent to the Academy's collection, use, external hosting, and disclosure of your personal data in accordance with the terms of the Privacy Policy.`}
      />

      {/* The information we collect */}
      <PolicySection
        id="information-collect"
        title="The information we collect"
        content={`The Academy of Excellence may collect personal data about you, including: The information you may provide us when registering at the Academy of Excellence, including your name, phone number, address, and email address, as well as demographic data (such as date of birth), educational background, professional background, and more. Any opinions or comments you provide us through the website or otherwise. The data we may collect about you for background checks if you apply for a job at the Academy of Excellence from publicly available sources or commercial sources (within the legally permitted scope), including, but not limited to, websites that contain publicly available information about you, such as LinkedIn, Twitter, job boards, or others. The information we may automatically receive about the device you use when visiting the site, including: your Internet Protocol (IP) address, information about the browser or type of device you are using, data collected through cookies and similar technologies, and the date and time of your visit to the site and the content you view on the site. We may also create data records about you, such as records of your communications and interactions with us, including your attendance at events hosted by the Academy of Excellence.`}
      />

      {/* Collection and use of your personal data */}
      <PolicySection
        id="collection-use"
        title="Collection and use of your personal data"
        content={`We may collect and use your personal data for any of the following purposes: Ensuring safe and smooth browsing of the website. Gathering statistical data about website usage. Considering and responding to requests, communicating with you, and providing you with information or services you may request, such as [registering for membership in the Academy of Excellence, connecting you with suitable training and job opportunities, submitting your applications for any position at the Academy of Excellence, or entering into a contractual relationship with you, fulfilling any legal, regulatory, accounting, disclosure, or accreditation requirements from a specific entity. Keeping records of meetings, seminars, and training events for future training activities. Promoting our events and activities, including on our website and through social media. For administrative and operational purposes related to the Academy of Excellence. Predicting content that may interest you (including through inquiries and statistical surveys). For litigation purposes.`}
      />

      {/* Transferring and disclosing your personal data */}
      <PolicySection
        id="transferring-disclosing"
        title="Transferring and disclosing your personal data"
        content={`Your personal data will be transferred and stored on our servers or third-party servers. We will take all reasonable steps necessary to ensure the protection of your personal data in accordance with the terms of our privacy policy. We may need to disclose or transfer your personal data: To any competent public authority, government, or regulatory body in compliance with any law or regulation to which we are subject. Where there is a public interest or legal obligation to do so (for example, to assist in the detection of a crime, regulatory reporting, litigation, or defense of legal rights); To our advisors (where appropriate), including lawyers, bankers, auditors, accountants, and insurance companies. To enforce any agreements we have made with you. To our partners and third parties who provide services to the Academy of Excellence, including but not limited to those who provide website operation, IT, and system management services. To any other party in the event of a restructuring of the Academy of Excellence or if it is liquidated.`}
      />

      {/* Social Media */}
      <PolicySection
        id="social-media"
        title="Social Media"
        content={`We may establish pages or accounts on social media platforms such as Facebook, LinkedIn, and Twitter, and our website may contain links to our pages or accounts on social media. If you wish to visit any of our channels on social media platforms, you should review the privacy policy of the relevant social media platform for more information on how they handle your personal data. The Academy of Excellence reserves the right to remove comments from its social media channels.`}
      />

      {/* How We Protect and Handle Your Personal Data */}
      <PolicySection
        id="protect-handle"
        title="How We Protect and Handle Your Personal Data"
        content={`The Academy of Excellence confirms that it has implemented strong technical and organizational measures to protect any personal data we collect and store. All employees of the Academy of Excellence who have access to your personal data are subject to strict guidelines to ensure data protection and compliance with applicable local data protection laws and regulations. Although we will take all reasonable steps necessary to protect your personal data, we cannot guarantee the safety and security of the data transmission process from you to the site. However, once we receive your personal data, we will implement strict procedures to attempt to prevent any unauthorized access to the data.`}
      />

      {/* International data transfer operations */}
      <PolicySection
        id="international-transfer"
        title="International data transfer operations"
        content={`We store and process your personal data in various countries, including the Kingdom of Saudi Arabia. The Academy of Excellence or one of its partners or service providers may transfer and process your personal data outside the country where your personal data was collected. In this case, we will take all reasonable steps and/or those required by applicable data protection laws to ensure that your information is kept secure and in accordance with our privacy policy and applicable law.`}
      />

      {/* How long do we retain your personal data? */}
      <PolicySection
        id="retention"
        title="How long do we retain your personal data?"
        content={`We will retain your personal data as long as necessary to fulfill the purposes for which we collected and processed the data in accordance with the privacy policy, or for any shorter or longer period as required by applicable law. We will not retain any personal data longer than necessary, and we will comply with securely disposing of all your personal data in accordance with our internal policies. You may request the Academy of Excellence to delete your personal data earlier by contacting us at the email address provided below.`}
      />

      {/* Your Rights */}
      <PolicySection
        id="your-rights"
        title="Your Rights"
        content={`Under certain applicable laws, you may have certain rights in respect of your Personal Data. Subject to certain limitations, these rights may include the right to: not provide your Personal Data to us; access your Personal Data; request a copy of your Personal Data; rectify or erase your Personal Data (add to or update/correct); restrict or object to the processing of your Personal Data; and lodge a complaint with the relevant authority. For the avoidance of doubt, nothing in this Privacy Policy affects any of your other statutory rights. If you would like to exercise any right(s) with respect to your Personal Data, please contact us at the email address provided below. We note that in the event you object to the processing of your Personal Data or refuse to provide your Personal Data, we may be unable to provide you with the full benefit of our Site and/or our activities, or your access to the Site may be impeded.`}
      />

      {/* Contact Us */}
      <PolicySection
        id="contact-us"
        title="Contact Us"
        content={`If you have any questions regarding this Privacy Policy, please contact: info@al-tamayyuz.com.`}
      />

      {/* Legal notice */}
      <PolicySection
        id="legal-notice"
        title="Legal notice"
        content={`TERMS OF USE - Effective Date: 25/03/2021 Altamayyuz Finance & Accounting Excellence Academy ("we", "our" or "Altamayyuz") owns and operates this website (al-tamayyuz.com) and related mobile applications (together, the "Site"). Before using our Site, please read these Terms of Use carefully. By using the Site, you agree to be bound by these Terms of Use and by our Privacy Policy. If you do not agree to these Terms of Use or our Privacy Policy, please do not use the Site. Altamayyuz reserves the right to modify these Terms of Use at any time by posting modified Terms of Use, and your continued use of the Site thereafter will constitute agreement with such modifications.`}
      />

      {/* Links to other websites */}
      <PolicySection
        id="links-websites"
        title="Links to other websites"
        content={`For your convenience, this Site may contain links to other sites, including some sites administered by Altamayyuz, or administered by third parties on behalf of Altamayyuz, as well as to sites unaffiliated with Altamayyuz. We advise you to review the privacy policy and terms of use of any such website. Altamayyuz is not responsible for the privacy practices or the content of linked websites that are not administered by or on behalf of Altamayyuz. A link on this Site to any other website not administered by or on behalf of Altamayyuz does not imply that: (1) Altamayyuz agrees with or endorses the information, data or representations contained therein; (2) Altamayyuz sponsors, endorses, or is affiliated with or otherwise connected with such website, or with the company(ies) that operate it; or (3) Altamayyuz has authorized the linked site to use any names, logos and trademarks or other copyrighted material of Altamayyuz or its affiliates. You acknowledge and agree that your access to, and use of, other sites that our Site provides a link to and your use of any material, products and services offered by such sites, are at your own risk.`}
      />

      {/* Privacy and personal information */}
      <PolicySection
        id="privacy-personal"
        title="Privacy and personal information"
        content={`We take usage of personal information very seriously. We understand that you will want to know how we use your personal information. Our privacy policy sets out information about how we use your personal information. We note that our privacy policy may be updated from time to time and we would recommend you review it regularly to take notice of any changes.`}
      />

      {/* Disclaimer */}
      <PolicySection
        id="disclaimer"
        title="Disclaimer"
        content={`The materials in this website are provided "as is" and without warranties of any kind, either express or implied. To the fullest extent permissible pursuant to applicable law, Altamayyuz disclaims all warranties, express or implied, with regard to the information and materials contained on this Site including, but not limited to, implied warranties of merchantability and fitness for a particular purpose. Altamayyuz does not warrant that the functions contained in the materials will be uninterrupted or error-free, or that this Site or the server through which the materials are made available are free of viruses or other harmful components. Altamayyuz does not warrant or make any representations regarding the use or the results of the use of the materials in this Site in terms of their correctness, accuracy, reliability, or otherwise. You (and not Altamayyuz) assume the entire cost of all necessary servicing, repair or correction you need to make use of the materials. Neither Altamayyuz nor any of its affiliates shall be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in any way connected with accessing or using any content on this Site or any content on any website or websites linked to this Site. Altamayyuz reserves the right to make changes to this Site at any time without notice.`}
      />

      {/* Indemnification */}
      <PolicySection
        id="indemnification"
        title="Indemnification"
        content={`You agree that you will not use this Site for any unlawful purpose or for any purpose prohibited by these Terms of Use. You agree to indemnify, defend and hold harmless Altamayyuz, its partners, affiliates and contributors from any liability, loss, claim and expense (including attorneys' reasonable fees) related to (i) your violation of these Terms of Use, and/or (ii) your posting or use of materials on this Site.`}
      />

      {/* Ownership of the copyright of this website */}
      <PolicySection
        id="copyright"
        title="Ownership of the copyright of this website"
        content={`All material contained in this Site, in the form of text, graphics, user interfaces, visual interfaces, photographs, trademarks, logos, sounds, music, artwork, any downloads and computer code (collectively, "Content"), including but not limited to the design, structure, selection, coordination, expression, "look and feel" and arrangement of such Content, contained on the Site is owned, controlled or licensed by or to Altamayyuz, and is protected by intellectual property rights and unfair competition laws. All rights reserved. Except as expressly provided in these Terms of Use, no part of the Site and no Content may be copied, reproduced, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted or distributed in any way (including "mirroring") to any other computer, server, website or other medium for publication or distribution or for any commercial enterprise, without Altamayyuz's express prior written consent. You may use information on Altamayyuz's services (such as data sheets, knowledge base articles, and similar materials) purposely made available by Altamayyuz for downloading from the Site, provided that you (1) not remove any proprietary notice language in all copies of such documents, (2) use such information only for your personal, non-commercial informational purpose and do not copy or post such information on any networked computer or broadcast it in any media (unless otherwise stated explicitly on the Site), (3) make no modifications to any such information, and (4) not make any additional representations or warranties in respect of such documents. The name and logo of Altamayyuz are registered trademarks of Altamayyuz. The use of these trademarks for promotion of a third-party company or product is not permitted without our express approval. External media publications may display our name and logo on their media reports on Altamayyuz.`}
      />

      {/* Applicable law */}
      <PolicySection
        id="applicable-law"
        title="Applicable law"
        content={`These Terms of Use shall be governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia. The courts of the Kingdom of Saudi Arabia shall have non-exclusive jurisdiction over any dispute arising out of or in connection to your use of this Site. Altamayyuz reserves the right to bring proceedings to the courts of the country of your location. In the event that any or any part of the terms contained in these Terms of Use is determined by any competent authority to be invalid, unlawful or unenforceable to any extent, such term shall to that extent be severed from the remaining terms which shall continue to be valid and enforceable to the fullest extent permitted by law.`}
      />

      {/* COOKIE POLICY */}
      <PolicySection
        id="cookie-policy"
        title="COOKIE POLICY"
        content={`Altamayyuz Finance & Accounting Excellence Academy ("we", "our" or "Altamayyuz") owns and operates this website (al-tamayyuz.com) and related mobile applications (together "Site"). Before using our Site, please read this cookie policy carefully.`}
      />

      {/* Cookies */}
      <PolicySection
        id="cookies"
        title="Cookies"
        content={
          <div>
            <p>
              Cookies we use We use Google Analytics to analyze the use of this website. Google Analytics generates statistical and other information about website use by means of cookies, which are stored on users' computers. The information generated relating to our website is used to create reports about the use of the website. Google will store this information. Google's privacy policy is available at{" "}
              <span className="inline-flex items-center px-[8px] py-[2px] bg-[#f6f8fa] text-[#525866] text-[12px] font-medium rounded-[4px]">
                Link
              </span>
            </p>
            <p className="mt-4">
              You can find more information about cookies and how to manage them at{" "}
              <span className="inline-flex items-center px-[8px] py-[2px] bg-[#f6f8fa] text-[#525866] text-[12px] font-medium rounded-[4px]">
                Link
              </span>{" "}
              You may disable cookies by changing the settings on your browser. However, if you do so, this will affect your enjoyment of our site and we will no longer be able to offer to you a personalized service.
            </p>
          </div>
        }
      />

      {/* How are third party cookies used? */}
      <PolicySection
        id="third-party-cookies"
        title="How are third party cookies used?"
        content={`For some of the functions within our Site we use third party suppliers. For example: when you visit a page with videos embedded from or links to YouTube. These videos or links (and any other content from third party suppliers) may contain third party cookies. We encourage you to consult the privacy policies of these third party vendors on their websites for information regarding their use of cookies (please see more information below).`}
      />

      {/* List of cookies */}
      <PolicySection
        id="list-cookies"
        title="List of cookies"
        content={
          <div>
            <p className="mb-4">
              <strong>Google Analytics:</strong> We use Google Analytics to understand how our media campaigns work and how you interact with our Site in order to improve the user experience.{" "}
              <span className="inline-flex items-center px-[8px] py-[2px] bg-[#f6f8fa] text-[#525866] text-[12px] font-medium rounded-[4px]">
                Link
              </span>
            </p>
            <p className="mb-4">
              <strong>Google tracking cookies:</strong> Google tracking cookies enable us to understand if you complete certain actions on our Site(s) after you have seen or clicked through one of our adverts served via Google. Based on the content you have engaged with on our Site, Google is able to deliver some targeted adverts across other Google partner websites.
            </p>
            <p className="mb-4">
              <strong>Google Optimize:</strong> We use Google Optimize which enables us to utilize analytics cookies to target content variants to a user and a content experiment cookie to determine a user's participation (e.g. tracking users clicks or recording a visit).{" "}
              <span className="inline-flex items-center px-[8px] py-[2px] bg-[#f6f8fa] text-[#525866] text-[12px] font-medium rounded-[4px]">
                Link
              </span>
            </p>
            <p className="mb-4">
              <strong>Google remarketing/ audience lists:</strong> We use this to keep track of who has visited the Sites to allow remarketing via Google adverts. It collects users ID/ browser ID and is held via a cookie on your browser, or if you are logged into a google account, it will be collected via there as well.
            </p>
            <p className="mb-4">
              <strong>YouTube:</strong> We may embed videos or insert links to videos from YouTube on our website(s). As a result, when you visit a page with content embedded from or linked to YouTube, you may be presented with cookies from YouTube.
            </p>
            <p>
              <strong>Social Media Cookies:</strong> We may utilize cookies from social media partners such as{" "}
              <span className="inline-flex items-center px-[8px] py-[2px] bg-[#f6f8fa] text-[#525866] text-[12px] font-medium rounded-[4px]">
                LinkedIn
              </span>
              ,{" "}
              <span className="inline-flex items-center px-[8px] py-[2px] bg-[#f6f8fa] text-[#525866] text-[12px] font-medium rounded-[4px]">
                Facebook
              </span>{" "}
              and{" "}
              <span className="inline-flex items-center px-[8px] py-[2px] bg-[#f6f8fa] text-[#525866] text-[12px] font-medium rounded-[4px]">
                Twitter
              </span>
              . These social media partners may drop cookies on your device when you visit our Site. This means that when you later access such social media sites, adverts that are more tailored and suited to your potential interests may be displayed to you.
            </p>
          </div>
        }
      />
    </div>
  );
}
