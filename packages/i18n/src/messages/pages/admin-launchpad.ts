export const adminLaunchpadMessages = {
  adminLaunchpadRequest: {
    title: 'Launchpad Requests',
    description: 'When Admin approve, the launchpad will be displayed in OpenEdu. Admin',
    launchpadName: 'Launchpad Name',
    courseName: 'Course Name',
    owner: 'Owner',
    requestedDate: 'Requested Date',
    sections: 'Sections',
    target: 'Target',
    ownerTelegramLink: 'Owner Telegram Link',
    verificationEmail: 'Verification Email',
    action: 'Action',
    approve: 'Approve',
    reject: 'Reject',

    approveSuccess: 'Approve success',
    rejectSuccess: 'Reject success',
    info: {
      createdBy: 'Created by',
      createdAt: 'Created at',
      fundingRange: '{target} {currency} - {min} {currency}',
    },
    funding: {
      amount: '{amount} {currency}',
      target: 'target',
      visualization: 'Funding visualization',
    },
    contact: {
      copyToClipboard: 'Copy to clipboard',
    },
    page: {
      ownerTelegramLink: 'Owner Telegram Link*',
      verificationEmail: 'Verification Email *',
    },

    approveModal: {
      title: 'Approve This Launchpad',
      description: 'When you approve this launchpad, it will be published in OpenEdu. Please be certain before action!',
      approve: 'Approve',
      cancel: 'Cancel',
    },
    rejectModal: {
      title: 'Reject This Launchpad',
      description:
        'When you reject this launchpad, it can not be published in OpenEdu. Please be certain before action!',
      reason: 'Your reason for rejection',
      placeholderReason: 'Write your reason',
      reject: 'Reject',
      cancel: 'Cancel',
      errors: {
        isRequired: 'This field is required',
      },
    },
  },
  adminLaunchpadApproved: {
    title: 'Launchpad Approved',
    description: 'When Admin approve, the launchpad will be displayed in OpenEdu. Admin',
    launchpadName: 'Launchpad Name',
    courseName: 'Course Name',
    owner: 'Owner',
    requestedDate: 'Requested Date',
    sections: 'Sections',
    target: 'Target',
    ownerTelegramLink: 'Owner Telegram Link',
    verificationEmail: 'Verification Email',
    draft: 'Draft',
    reviewing: 'Reviewing',
    rejected: 'Rejected',
    approved: 'Approved',
    publish: 'Publish',
    cancelled: 'Cancelled',
    success: 'Success',
    voting: 'Voting',
    failed: 'Failed',
    funding: 'Funding',
    waiting: 'Waiting',
    refunded: 'Refunded',
    status: 'Status',
    info: {
      createdBy: 'Created by',
      createdAt: 'Created at',
      fundingRange: '{target} {currency} - {min} {currency}',
    },
    fundingCard: {
      amount: '{amount} {currency}',
      target: 'target',
      visualization: 'Funding visualization',
    },
    contact: {
      copyToClipboard: 'Copy to clipboard',
    },
    page: {
      ownerTelegramLink: 'Owner Telegram Link*',
      verificationEmail: 'Verification Email *',
    },
  },
  creatorSettingLaunchpad: {
    title: 'Launchpad',
    saved: 'Saved',
    publishLaunchpadSuccess: 'Publish Launchpad Success',
    updateNameSuccess: 'Update name success',
    create: {
      title: 'Create New Launchpad',
    },
    generalInfo: {
      title: 'General Info',
      desc: 'Description',
      category: 'Category',
      level: 'Level',
      previewVideo: 'Preview Video',
      thumbnail: 'Thumbnail Image',
      courseContent: 'Course Content',
      previewVideoDesc: 'File MP4 size no more than 10MB',
      uploadVideo: 'Upload Video',
      addPreviewVideo: 'Add preview video',
      courseContentDesc: 'This selecting course will be displayed for backer later',
      createdBy: 'Created by',
      createdAt: 'Created at',
      thumbnailRequired: 'This field is required',
      loading: '...loading',
      courseFundingNotice: 'Course Funding Notice',
      courseFundingRules: {
        minSections: 'Your course content must include at least 4 sections.',
        notFree: 'Your course price must not be FREE.',
      },
      errors: {
        thumbnailRequired: 'Thumbnail is required',
        previewVideoRequired: 'Preview video is required',
        levelIdRequired: 'Level ID is required',
        categoryIdRequired: 'Category ID is required',
      },
    },
    launchpadPublish: {
      publishLaunchpad: 'Publish Launchpad',
      successTittle: 'Your launchpad is successfully sent to admin!',
      successDescription:
        'This launchpad needs to be reviewed by Admin Open Edu and Admin Organization before approval to publish. Please send request and wait till the review is done.',
      goLaunchpadDetail: 'Go To Launchpad Detail',
      viewLaunchpadList: 'View Launchpad List',
      publishLaunchpadModal: {
        title: 'Request For Approval',
        description:
          'This version needs to be reviewed by Admin Open Edu and Admin Organization before approval to publish. Please send request for approval.',
        warning:
          'Once you decide to send request for approval for this launchpad, you can not edit this launchpad no more. Please concern before action.',
      },
    },
    fundingGoal: {
      title: 'Funding',
      targetFundingGoal: 'Target Funding Goal',
      targetFundingGoalDesc: 'Your max funding goal may reach as double of this amount.',
      minPledge: 'Min Pledge',
      sharePercentageAllBackers: 'Share % total profit for all backers',
      numberDayRunFunding: 'Number of days estimated to run the funding',
      errors: {
        validNumber: 'Please enter a valid number',
        percentageRange: 'This field must be between 1 and 100',
      },
    },
    votingPlan: {
      title: 'Voting Plan',
      subTitle: 'Your launchpad will include',
      votingTimes: 'voting times',
      description:
        'Please enter the number of section for each voting time and the estimated publish date to create voting timeline for backer. The voting plan will be displayed for backer when they join to vote. Follow the plan will help you get higher chance on to get “yes” voting',
      publishDate: 'Publish Date',
      estimated: 'Estimated',
      estimatedAfter: 'Estimated after funding end date',
      votingEnd: 'Voting End Date',
      publishDateAndVotingEndDate: 'Publish Date & Voting End Date',
      numberOfSection: 'Number of section published in this date',
      warning:
        'If this date is over and voting phase does not happen, launchpad will be closing and backer get refund.',
      totalTargetSection: 'Total target section',
      milestoneDescription:
        'Latest time to start voting is 7 days from this date. End of this date without starting the voting, the launchpad will end.',
      notice: {
        fundingGoalLessThan:
          'If the funding goal is <strong>less than {amount} USD</strong> the course will have only <strong>{phases} voting phases</strong> after publishing the course.',
        fundingGoalBetween:
          'If the funding goal is <strong>{min} - {max} USD</strong> the course will have maximum <strong>{phases} voting phases</strong>.',
        fundingGoalGreaterThan:
          'If the funding goal is greater than <strong>{amount} USD</strong> the course will have maximum <strong>{phases} voting phases</strong>.',
        approvalPercentageOver:
          '<strong>If over {percentage}% of backers vote Decline:</strong> the creator will receive money through OpenEdu wallet.',
        approvalPercentageUnder:
          '<strong>If less than {percentage}% of backers vote Decline:</strong> the backer will receive a refund through OpenEdu wallet.',
        votingEndDateWarning:
          'If this voting end date is over and voting phase does not happen, launchpad will be closing and backer get refund.',
      },
      noFundingGoal: {
        desc1: 'Please input information in',
        desc2: 'in order to define voting plan for this launchpad!',
        fundingGoal: 'Funding Goal',
      },
      errors: {
        futureDateRequired: 'Please pick the date from now or the future',
        minimumSections: 'Minimum 4 sections',
      },
    },
    ownerAndCollabs: {
      title: 'Launchpad Owner',
      verifyEmail: 'Verification Email',
      telegramLink: 'Telegram Link',
      courses: 'Courses',
      blogs: 'Blogs',
      roles: {
        creator: 'Creator',
        writer: 'Writer',
        editor: 'Editor',
        admin: 'Admin',
      },
      for: 'For',
      seeMore: 'See More',
      seeLess: 'See less',
      telegramNotice: {
        prefix: 'Please',
        linkText: 'update telegram link',
        suffix: 'in user profile to get permission for launchpad publishing!',
      },
      errors: {
        telegramRequired: 'Telegram link is required',
        invalidTelegramFormat: 'Please enter a valid Telegram link (e.g., https://t.me/username)',
      },
      updateTelegramMessage:
        'Please <bold>update telegram link</bold> in user profile to get permission for launchpad publishing!',
    },
    paymentMethod: {
      title: 'Payment Process',
      subTitle: 'Receive funding via USDT tokens in OpenEdu wallet.',
      verifyEmail: 'Verification Email',
      fee: 'Launchpad Publishing Fee',
      openEduWallet: 'OpenEdu Wallet',
      deposit: 'Deposit',
      depositAlert: 'Please deposit 1 NEAR to proceed the launchpad publishing!',
      network: 'Network',
      amount: 'Available Amount',
      depositSuccess: 'Deposit 1 NEAR is done! You are free to publish!',
      depositModal: {
        promptBefore: 'Please',
        promptAfter: '{amount} NEAR to proceed the launchpad publishing!',
      },
      depositModalDialog: {
        title: 'Deposit',
        network: 'Network',
        amount: 'Amount',
        submit: 'Submit',
        toast: {
          success: 'Deposit successfully!',
        },
      },
    },
    breadcrumb: {
      homepage: 'Homepage',
      creator: 'Creator',
      launchpads: 'Launchpads',
      detail: 'Launchpad Detail',
      lesson: 'Lesson',
    },
    menu: {
      generalInfo: 'General Info',
      fundingGoal: 'Funding Goal',
      votingPlan: 'Voting Plan',
      ownerAndCollabs: 'Owner & Collabs',
      paymentMethod: 'Payment Method',
    },
    selectCourse: {
      title: 'Select From Course List',
      notice: 'Notice: All course include 4 sections at least.',
      createError: 'Failed to create launchpad',
      loadingMore: 'Loading more courses...',
    },
    common: {
      cancel: 'Cancel',
      request: 'Request',
    },
  },
};
