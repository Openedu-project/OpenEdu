export const launchpadDetailPageMessages = {
  launchpadDetailPage: {
    title: {
      creator: 'Creator & Collabs',
      course: 'Course',
      description: 'Description',
      courseContent: 'Course Content',
    },
    common: {
      days: 'days',
      day: 'day',
      left: 'left',
      ended: 'ended',
      funded: ' funded',
      createBy: 'Create by ',
      createAt: 'Create at ',
      backers: ' backers',
      section: 'Section ',
      lesson: 'Lesson ',
    },
    buttons: {
      pledge: 'Pledge This Course',
      loginToEnroll: 'Login to Enroll',
    },
    pledgePage: {
      title: 'Launchpad Pledge',
      form: {
        amount: 'Pledge Amount',
        enterAmount: 'Enter Amount',
        minAmount: 'Min 5$',
        paymentMethod: 'Payment Method',
        paymentMethodDesc: 'Funding through USDT token in OpenEdu wallet.',
        walletNotice1: "You don't have any ",
        walletNotice2: ' in your wallet for pledge',
        btnProcess: 'Process Payment',
        error: {
          required: 'Amount is required',
          invalidNumber: 'Please enter a valid number',
          minAmount: 'Amount must be greater than 5',
          exceedBalance: 'Amount exceeds your available balance',
        },
      },
      confirmDialog: {
        title: 'Confirm Your Pledge',
        desc1: 'You are about to pledge ',
        desc2: ' from your OpenEdu wallet. This action cannot be undone.',
        desc3:
          'Because we use tokens for funding, once you pledge, you will not be able to withdraw your pledge amount.',
        desc4: 'You should ensure that the launchpad course will make a profit before deciding to pledge.',
        desc5: 'Your pledge can be maximum 20% total target funding.',
        termsAccept: 'I agreed to the Terms & Conditions',
        tearmsWarning: 'Please accept the terms and conditions to continue',
        btnConfirm: 'Confirm Pledge',
        btnCancel: 'Cancel',
      },
      successDialog: {
        title: 'Your launchpad pledging is successfully proceed!',
        desc: 'Please check your Email adress to receive the proceed verification from OpenEDU system. The Voting stage will comming soon!',
        btnGoToLaunchpad: 'Go To Launchpad Detail',
        btnViewLaunchpadList: 'View Launchpad List',
      },
    },
  },
};
