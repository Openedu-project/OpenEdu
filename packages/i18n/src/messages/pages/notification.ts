export const notificationMessage = {
  notification: {
    notifications: 'Notifications',
    markAllAsRead: 'Mark all as read',
    noNotifications: 'No notifications',
    noMoreNotifications: 'No more notifications',
    ai_tool: 'AI Tool',
    learner_description: 'Course Generator',

    // Course (0-99)
    code1:
      'Your request to publish the course <strong>{course_name}</strong> has been approved and is now live on <strong>{org_name}</strong>.',
    code3:
      'Your request to publish the course <strong>{course_name}</strong> has been rejected for display on <strong>{organization_name}</strong>.',
    code4: '',
    code5:
      'You have been added as a <strong>{collaborator}</strong> to the course <strong>{course_name}</strong> by <strong>{user_name}</strong>.',
    code6: 'You have been removed as a <strong>{collaborator}</strong> from the course <strong>{course_name}</strong>.',
    code7:
      'A new request to publish the course <strong>{course_name}</strong> has been submitted by educator <strong>{user_name}</strong>.',
    code8: '',
    code9: '',
    code10: '',
    code11: 'Orgnization admin disabled the course <strong>{course_name}</strong>.',
    code12:
      'Your course <strong>{course_name}</strong> has been enabled and is now visible on the website. Learners can access it immediately.',
    code13: 'Your course <strong>{course_name}</strong> has been disabled and is currently hidden from the website.',
    code14: 'Course <strong>{course_name}</strong> generated successfully with <strong>{course_ai_tool}</strong> ',
    code15: 'Unable to create with <strong>{course_ai_tool}</strong> . Please try again.',

    // Blog (100-199)
    code100: 'Your request to publish the blog <strong>{blog_name}</strong> has been approved!',
    code101: 'Your request to publish the blog <strong>{blog_name}</strong> has been rejected.',
    code102: '',
    code103: 'You have been invited to become a <strong>writer</strong>',
    code104: 'Your role as <strong>writer</strong> has been removed.',
    code105: 'You have been invited to become a <strong>editor</strong>',
    code106: 'Your role as <strong>editor</strong> has been removed.',
    code107: 'Your blog <strong>{blog_name}</strong> has been hidden by the admin due to a content violation',
    code108: 'Blog generated successfully by AI.',
    code109: 'AI failed to generate the blog. Please try again.',

    // Certificate (200-299)
    code200:
      'Congratulations, <strong>{display_name}</strong>! You’ve completed the <strong>{course_name}</strong> course. View your certificate here.',
    code201:
      "Congratulations! You've received a new NFT Certificate for completing your course. Check it out in your NFT collection to see your achievement. 🎉",

    // Wallet (300-399)
    code300:
      'User <strong>{user_name}</strong> has submitted a withdrawal request for <strong>{amount} {currency}</strong>.',
    code301:
      'Your withdrawal request of <strong>{amount} {currency}</strong> has been approved by admin <strong>{user_name}</strong>.',
    code302:
      'Your withdrawal request of <strong>{amount} {currency}</strong> has been declined by admin <strong>{user_name}</strong>.',

    // Avail Retroactive (400-499)
    code400: '',

    // Launchpad (700-799)
    code700:
      'New review required: Educator <strong>{user_name}</strong> submitted <strong>{launchpad_name}</strong> launchpad.',
    code701: '<strong>{launchpad_name}</strong> launchpad approved! Ready for funding setup 🚀.',
    code702: '<strong>{launchpad_name}</strong> launchpad request rejected. Updates needed before publishing.',
    code703: '<strong>{launchpad_name}</strong> funding unsuccessful - Request rejected. Goal not reached.',
    code704: '<strong>{launchpad_name}</strong> entered waiting period. Funding goal reached.',
    code705: '<strong>{launchpad_name}</strong> Ready for next phase 🎉.',
    code706: '<strong>{launchpad_name}</strong> progress review - Your vote matters!',
    code707: '<strong>{launchpad_name}</strong> voting period ended - Your vote automatically approved.',
    code708: '<strong>{launchpad_name}</strong> voting passed - Funds released! Continue development 🎉.',
    code709: '<strong>{launchpad_name}</strong> voting unsuccessful - Development halted.',
    code710:
      '<strong>{launchpad_name}</strong> by <strong>{user_name}</strong> ready for publishing review - Launchpad completed.',
    code711: '<strong>{launchpad_name}</strong> oting failed - Your refund is available.',
    code712: '<strong>{course_name}</strong> Educator inactive - Claim your investment back.',
  },
} as const;
