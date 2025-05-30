export const affiliateCampaignMessage = {
  affiliateCampaign: {
    title: 'Affiliate Campaigns',
    name: 'Name',
    startDate: 'Start Date',
    endDate: 'End Date',
    status: 'Status',
    action: 'Action',
    active: 'Active',
    inactive: 'Inactive',
    delete: 'Delete',
    edit: 'Edit',
    createCampaign: 'Create Campaign',
    success: 'Success',
    deleteSuccess: 'Delete Success',
  },
  affiliateCampaignFormModal: {
    createAffiliateCampaign: 'Create Affiliate Campaign',
    editAffiliateCampaign: 'Edit Affiliate Campaign',
    save: 'Save',
    cancel: 'Cancel',
    enable: 'Enable',
    name: 'Name',
    placeholderName: 'Enter name',
    startDate: 'Start Date',
    endDate: 'End Date',
    hasEndDate: 'Has End Date',
    errors: {
      isRequired: 'This field is required',
      startEndDate: 'End date must be after start date',
      isRequiredStartDate: 'Start date is required',
      isValidStartDate: 'Start date is invalid',
      isValidEndDate: 'End date is invalid  ',
    },
  },
  affiliateCampaignDeleteModal: {
    delete: 'Delete',
    cancel: 'Cancel',
    title: 'Affiliate Campaign will be deleted',
    desc: 'Are you sure you want to delete this affiliate campaign?',
  },
  affiliateCampaignDetailAddCourse: {
    courseName: 'Course Name',
    price: 'Price',
    token: 'Token',
    action: 'Action',
    delete: 'Delete',
    addCourses: 'Add Courses',
    addCourseSuccess: 'Course added successfully',
    removeCourseSuccess: 'Course removed successfully',
  },
  affiliateDetailCourseModal: {
    addCoursesTitle: 'Add Courses',
    save: 'Save',
    cancel: 'Cancel',
    selectCourses: 'Select Courses',
    errors: {
      isRequired: 'Please select at least one course',
    },
  },
  affiliateDetailDeleteCourseModal: {
    title: 'Course will be deleted',
    desc: 'Are you sure you want to delete this course?',
    delete: 'Delete',
    cancel: 'Cancel',
  },
  affiliateDetailReferrers: {
    email: 'Email',
    type: 'Type',
    status: 'Status',
    action: 'Action',
    pending: 'Pending',
    accept: 'Accept',
    delete: 'Delete',
    addReferrers: 'Add Referrers',
    createSuccess: 'Create Success',
    deleteSuccess: 'Delete Success',
    kol: 'Partner',
    partner: 'Partner',
    baseRate: 'Base Rate',
    agency: 'Agency',
    purchased_user: 'Course Learner',
    specificReferrers: 'Specific Referrers',
    user: 'User',
    downline: 'Downline',
  },
  affiliateDetailReferrerFormModal: {
    addReferrers: 'Add Referrers',
    type: 'Type',
    selectType: 'Select Type',
    partner: 'Partner',
    agency: 'Agency',
    emails: 'Emails',
    save: 'Save',
    cancel: 'Cancel',
    placeholderEmail: 'Enter email',
    errors: {
      isRequiredEmail: 'Email is required',
      invalidEmail: 'Invalid email',
    },
  },
  affiliateDetailDeleteReferrerModal: {
    title: 'Referrer will be deleted',
    desc: 'Are you sure you want to delete this referrer?',
    delete: 'Delete',
    cancel: 'Cancel',
  },
  affiliateDetailCommission: {
    commission: 'Commission',
    courseName: 'Course Name',
    commissionRate: 'Commission Rate',
    action: 'Action',
    delete: 'Delete',
    addCommission: 'Add Commission',
    createSuccess: 'Create Success',
    deleteSuccess: 'Delete Success',
    baseCommission: 'Base Commission',
    kol: 'Partner',
    partner: 'Partner',
    agency: 'Agency',
    purchasedUser: 'Course Learner',
    specificReferrers: 'Specific Referrers',
    baseRate: 'Base Rate',
    purchased_user: 'Course Learner',
    commissionType: 'Commission Type',
    ref1Rate: 'Referrer 1 Rate',
    ref2Rate: 'Referrer 2 Rate',
    ref3Rate: 'Referrer 3 Rate',
    bonus: 'Bonus',
    status: 'Status',
    active: 'Active',
    inactive: 'Inactive',
    seeDetail: 'See Detail',
    edit: 'Edit',
  },
  affiliateCommissionFormModal: {
    baseCommission: 'Base Commission',
    commissionRate: 'Commission Rate',
    deleteCommissionSuccess: 'Delete Commission Success',
    save: 'Save',
    cancel: 'Cancel',
    kolCommissionTitle: 'Partner',
    agencyCommissionTitle: 'Agency',
    courseLearnerCommissionTitle: 'Course Learner',
    specificReferrers: 'Specific Referrers',
    baseCommissionDescription:
      'This is the standard commission rate, applied to all users. Only one base commission can be added per campaign.',
    kolCommissionDescription:
      'This commission rate applies to users with the Partner role that you’ve added. Only one Partner commission can be added per campaign.',
    agencyCommissionDescription:
      'This commission rate applies to users with the Agency role that you’ve added. Only one Agency commission can be added per campaign.',
    courseLearnerCommissionDescription:
      'This commission rate applies to users who have purchased the added courses. Only one Course Learner commission can be added per campaign.',
    specificRefCommissionDescription:
      'This commission rate applies to users you add in the <strong>Select Referrers</strong> field, which will be loaded from your list of referrers.',
    activate: 'Activate',
    baseRate: 'Base Rate',
    ref2BonusRate: 'Ref-2 Bonus Rate',
    ref3BonusRate: 'Ref-3 Bonus Rate',
    level: 'Level',
    addBonusRate: 'Add Bonus Rate',
    bonusRate: 'Rate',
    bonusQuantity: 'Quantity',
    noBonuses: 'No bonuses available',
    selectReferrers: 'Select Referrers',
    errors: {
      isRequired: 'This field is required',
      rateOrder: 'Rates must be in descending order: Ref Level 1 > Ref Level 2 > Ref Level 3',
      quantityOrder: 'Quantity must be in ascending order',
      rateSumExceeded: 'The sum of ref1, ref2, and ref3 rates cannot exceed 100%',
      atLeastReferrer: 'At least one referrer must be selected',
    },
  },
  affiliateDetailDeleteCommissionModal: {
    title: 'Commission will be deleted',
    desc: 'Are you sure you want to delete this commission?',
    delete: 'Delete',
    cancel: 'Cancel',
  },
  affiliateCampaignReport: {
    report: 'Report',
    campaignName: 'Campaign Name',
    courseName: 'Course Name',
    currency: 'Currency',
    ref1Amount: 'Referrer 1 Amount',
    ref2Amount: 'Referrer 2 Amount',
    ref3Amount: 'Referrer 3 Amount',
    course: 'Course',
    coursePrice: 'Course Price',
    ref1Details: 'Referrer 1 Details',
    ref2Details: 'Referrer 2 Details',
    ref3Details: 'Referrer 3 Details',
    rate: 'Rate',
    amount: 'Amount',
    noRef1User: 'No Referrer 1 User',
    noRef2User: 'No Referrer 2 User',
    noRef3User: 'No Referrer 3 User',
  },
};
