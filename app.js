// Tailwind config
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#5D5CDE",
        secondary: "#00ffff",
        background: {
          light: "#ffffff",
          dark: "#181818",
        },
      },
      animation: {
        pulse: "pulse 2s ease-in-out infinite",
        "glow-border": "glow-border 2s infinite alternate",
        shimmer: "shimmer 3s infinite",
        bounce: "bounce 1.5s infinite",
        float: "float 3s ease-in-out infinite",
        "spin-slow": "spin 6s linear infinite",
        "gradient-x": "gradient-x 15s ease infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.03)", opacity: "1" },
        },
        "glow-border": {
          from: { boxShadow: "0 0 10px #1bffff, 0 0 5px #1bffff inset" },
          to: { boxShadow: "0 0 20px #8a2be2, 0 0 10px #8a2be2 inset" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%) rotate(30deg)" },
          "100%": { transform: "translateX(100%) rotate(30deg)" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "none",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-position": "0% 50%",
            "background-size": "200% 200%",
          },
          "50%": {
            "background-position": "100% 50%",
            "background-size": "200% 200%",
          },
        },
      },
    },
  },
};

// Check for dark mode preference
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

// Dark mode toggle handler
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    if (event.matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

// Wait for document to be ready
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  // ENHANCED: Show splash screen animation
  const splashScreen = document.getElementById("splashScreen");
  const loadingBar = document.getElementById("loadingBar");
  const loadingDots = document.getElementById("loadingDots");

  // Animated loading dots
  let dotsCount = 0;
  const dotsInterval = setInterval(() => {
    dotsCount = (dotsCount + 1) % 4;
    if (loadingDots) loadingDots.textContent = ".".repeat(dotsCount);
  }, 500);

  // Animate loading bar with incremental progress
  let width = 0;
  const loadingInterval = setInterval(() => {
    // Make the loading feel more natural with variable speed
    const increment = Math.random() * 3 + (width > 70 ? 1 : 5);
    width = Math.min(width + increment, 100);

    if (loadingBar) loadingBar.style.width = width + "%";

    if (width >= 100) {
      clearInterval(loadingInterval);
      clearInterval(dotsInterval);

      setTimeout(() => {
        if (splashScreen) {
          splashScreen.style.opacity = "0";
          splashScreen.style.transition = "opacity 0.8s ease";
          setTimeout(() => {
            splashScreen.style.display = "none";
          }, 800);
        }
      }, 500);
    }
  }, 100);

  // Variables
  const correctPassword = "1234"; // Demo password
  let provider, signer, contract;
  let connected = false;
  let account = null;
  const contractAddress = "0xbdD7894608cF5fF110e3E7b2C398e6FACD9a5dBC";
  const contractABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      inputs: [],
      name: "getBalance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address payable", name: "recipient", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "sendFunds",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    { stateMutability: "payable", type: "receive" },
  ];

  // ENHANCED: More comprehensive transaction history data for better search
  const allTransactions = [
    {
        to: "0xbdD7894608cF5fF110e3E7b2C398e6FACD9a5dBC",
        amount: "0.01",
        date: "2025/05/07",
        type: "outgoing",
        category: "Transfer",
        note: "Payment for services",
      }
    ,{
      to: "0x52676f0b841d7b40740ced9a218de532da9ba640",
      amount: "0.01",
      date: "2025/05/05",
      type: "outgoing",
      category: "Transfer",
      note: "Payment for services",
    },
    {
      to: "0xbdD7894608cF5fF110e3E7b2C398e6FACD9a5dBC",
      amount: "0.05",
      date: "2025/05/04",
      type: "incoming",
      category: "Investment",
      note: "Investment return",
    },
    {
      to: "0xbdD7894608cF5fF110e3E7b2C398e6FACD9a5dBC",
      amount: "0.25",
      date: "2025/04/30",
      type: "contract",
      category: "NFT",
      note: "NFT purchase",
    },
    {
      to: "0x52676f0b841d7b40740ced9a218de532da9ba640",
      amount: "0.075",
      date: "2025/05/29",
      type: "outgoing",
      category: "DeFi",
      note: "Liquidity provision",
    },
    {
      to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
      amount: "0.15",
      date: "2025/05/28",
      type: "outgoing",
      category: "Transfer",
      note: "Weekly savings",
    },
    {
      to: "0x52676f0b841d7b40740ced9a218de532da9ba640",
      amount: "0.02",
      date: "2025/04/27",
      type: "incoming",
      category: "Transfer",
      note: "Refund",
    },
  ];

  // Contact book storage
  let contacts = [
    {
      id: 1,
      name: "Main Wallet",
      address: "0x52676f0b841d7b40740ced9a218de532da9ba640",
    },
    {
      id: 2,
      name: "Exchange Account",
      address: "0xbdD7894608cF5fF110e3E7b2C398e6FACD9a5dBC",
    },
    {
      id: 3,
      name: "Cold Storage",
      address: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    },
    {
      id: 4,
      name: "Alice",
      address: "0x123f109551bD432803012645Ac136ddd64DBA456",
    },
    {
      id: 5,
      name: "Bob's Wallet",
      address: "0x987f109551bD432803012645Ac136ddd64DBA789",
    },
  ];

  // Exchange rate mock data
  const exchangeRates = {
    ETH: { USD: 3000, EUR: 2700, GBP: 2300 },
    BTC: { USD: 60000, EUR: 54000, GBP: 46000 },
    SOL: { USD: 100, EUR: 90, GBP: 77 },
  };

  // NEW: Profile data storage (in-memory, will reset on page refresh)
  let userProfile = {
    name: "Guest User",
    bio: "",
    profileImage: null,
    address: "",
    connected: false,
  };

  // NEW: Balance visibility state
  let balanceVisible = true;

  // Get DOM elements safely (with error handling)
  function getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
      console.warn(`Element with id '${id}' not found`);
    }
    return element;
  }

  // Get all required DOM elements
  const walletButton = getElement("walletButton");
  const statusEl = getElement("status");
  const sendBtn = getElement("sendBtn");
  const withdrawBtn = getElement("withdrawBtn");
  const sendContractBtn = getElement("sendContractBtn");
  const downloadBtn = getElement("downloadBtn");
  const recipientInput = getElement("recipient");
  const amountInput = getElement("amount");
  const contractRecipientInput = getElement("contractRecipient");
  const contractAmountInput = getElement("contractAmount");
  const refreshHistoryBtn = getElement("refreshHistory");
  const downloadAllBtn = getElement("downloadAllBtn");
  const themeToggleBtn = getElement("themeToggle");
  const accountBalance = getElement("account-balance");
  const refreshBalanceBtn = getElement("refresh-balance");
  const connectionIndicator = getElement("connection-indicator");

  // Success animation elements
  const successAnimation = getElement("successAnimation");
  const successMessage = getElement("successMessage");

  // Tab elements
  const sendTab = getElement("send-tab");
  const contractTab = getElement("contract-tab");
  const historyTab = getElement("history-tab");
  const accountTab = getElement("account-tab");
  const sendPanel = getElement("send-panel");
  const contractPanel = getElement("contract-panel");
  const historyPanel = getElement("history-panel");
  const accountPanel = getElement("account-panel");

  // Contact book elements
  const addressBookBtn = getElement("addressBookBtn");
  const contractAddressBookBtn = getElement("contractAddressBookBtn");
  const contactBook = getElement("contactBook");
  const contactsList = getElement("contactsList");
  const addContactBtn = getElement("addContactBtn");

  // Contact modals
  const addContactModal = getElement("addContactModal");
  const closeAddContactModal = getElement("closeAddContactModal");
  const contactName = getElement("contactName");
  const contactAddress = getElement("contactAddress");
  const saveContactBtn = getElement("saveContactBtn");
  const cancelAddContactBtn = getElement("cancelAddContactBtn");
  const contactError = getElement("contactError");

  const editContactModal = getElement("editContactModal");
  const closeEditContactModal = getElement("closeEditContactModal");
  const editContactName = getElement("editContactName");
  const editContactAddress = getElement("editContactAddress");
  const editContactId = getElement("editContactId");
  const updateContactBtn = getElement("updateContactBtn");
  const cancelEditContactBtn = getElement("cancelEditContactBtn");
  const deleteContactBtn = getElement("deleteContactBtn");
  const editContactError = getElement("editContactError");

  // Quick action buttons
  const btnReceive = getElement("btn-receive");
  const btnSwap = getElement("btn-swap");
  const btnCalculator = getElement("btn-calculator");

  // Currency converter elements
  const converterModal = getElement("converterModal");
  const closeConverterModal = getElement("closeConverterModal");
  const cryptoAmount = getElement("cryptoAmount");
  const cryptoType = getElement("cryptoType");
  const fiatAmount = getElement("fiatAmount");
  const fiatType = getElement("fiatType");
  const swapCurrencies = getElement("swapCurrencies");
  const converterOkBtn = getElement("converterOkBtn");

  // Modal elements
  const modal = getElement("modal");
  const modalTitle = getElement("modalTitle");
  const modalContent = getElement("modalContent");
  const qrCodeContainer = getElement("qrCodeContainer");
  const closeModalBtn = getElement("closeModal");
  const modalOkBtn = getElement("modalOkBtn");
  const passwordModal = getElement("passwordModal");
  const passwordInput = getElement("passwordInput");
  const passwordError = getElement("passwordError");
  const submitPasswordBtn = getElement("submitPasswordBtn");
  const cancelPasswordBtn = getElement("cancelPasswordBtn");
  const loadingSpinner = getElement("loadingSpinner");

  // NEW: Profile elements
  const profileBtn = getElement("profileBtn");
  const profileModal = getElement("profileModal");
  const closeProfileModal = getElement("closeProfileModal");
  const profileUpload = getElement("profile-upload");
  const profilePreview = getElement("profile-preview");
  const profileName = getElement("profileName");
  const profileBio = getElement("profileBio");
  const saveProfileBtn = getElement("saveProfileBtn");
  const cancelProfileBtn = getElement("cancelProfileBtn");
  const profileImageContainer = getElement("profile-image-container");
  const profileNameEl = getElement("profile-name");
  const profileAddressEl = getElement("profile-address");
  const editProfileBtn = getElement("editProfileBtn");

  // NEW: Notification elements
  const notificationsBtn = getElement("notificationsBtn");
  const notificationsPanel = getElement("notificationsPanel");
  const closeNotifications = getElement("closeNotifications");
  const notificationsList = getElement("notifications-list");
  const notificationBadge = getElement("notificationBadge");
  const transactionNotification = getElement("transactionNotification");
  const notificationTitle = getElement("notificationTitle");
  const notificationMessage = getElement("notificationMessage");
  const notificationIcon = getElement("notificationIcon");
  const closeNotificationBtn = getElement("closeNotificationBtn");
  const notificationProgressBar = getElement("notificationProgressBar");

  // NEW: Network elements
  const networkSelector = getElement("networkSelector");
  const networkPanel = getElement("networkPanel");

  // NEW: Balance visibility toggle
  const toggleBalanceVisibilityBtn = getElement("toggle-balance-visibility");

  // NEW: Help elements
  const helpBtn = getElement("helpBtn");
  const helpModal = getElement("helpModal");
  const closeHelpModal = getElement("closeHelpModal");
  const closeHelpBtn = getElement("closeHelpBtn");

  // NEW: Password change elements
  const changePasswordBtn = getElement("changePasswordBtn");
  const changePasswordModal = getElement("changePasswordModal");
  const closeChangePasswordModal = getElement("closeChangePasswordModal");
  const currentPassword = getElement("currentPassword");
  const newPassword = getElement("newPassword");
  const confirmPassword = getElement("confirmPassword");
  const passwordChangeError = getElement("passwordChangeError");
  const cancelPasswordChangeBtn = getElement("cancelPasswordChangeBtn");
  const updatePasswordBtn = getElement("updatePasswordBtn");

  // NEW: 2FA elements
  const toggle2fa = getElement("toggle-2fa");
  const twoFactorModal = getElement("twoFactorModal");
  const closeTwoFactorModal = getElement("closeTwoFactorModal");
  const verificationCode = getElement("verificationCode");
  const twoFactorError = getElement("twoFactorError");
  const cancelTwoFactorBtn = getElement("cancelTwoFactorBtn");
  const verifyTwoFactorBtn = getElement("verifyTwoFactorBtn");

  // ENHANCED: Search elements
  const searchInput = getElement("searchInput");
  const mobileSearchBtn = getElement("mobileSearchBtn");
  const mobileSearchOverlay = getElement("mobileSearchOverlay");
  const mobileSearchInput = getElement("mobileSearchInput");
  const closeMobileSearch = getElement("closeMobileSearch");
  const searchResults = getElement("searchResults");
  const desktopSearchResults = getElement("desktopSearchResults");

  // Transaction elements
  const txCategory = document.querySelectorAll(".category-pill");
  const txNote = getElement("tx-note");

  // Helper functions
  function showModal(title, content, showQR = false, address = null) {
    if (modalTitle) modalTitle.textContent = title;
    if (modalContent) modalContent.textContent = content;

    if (showQR && address && qrCodeContainer) {
      qrCodeContainer.innerHTML = "";
      qrCodeContainer.classList.remove("hidden");

      // Create a more attractive QR code display for wallet address
      const qrCode = document.createElement("div");
      qrCode.className = "p-4 bg-white rounded-lg shadow-lg";
      qrCode.innerHTML = `
            <div class="text-center mb-2 text-gray-800 font-medium">Scan to Send ETH</div>
            <div class="w-56 h-56 mx-auto bg-white p-2 rounded-lg border-2 border-primary flex items-center justify-center">
              <div class="w-full h-full relative bg-white">
                <!-- Simulated QR code pattern -->
                <div class="absolute inset-0 grid grid-cols-10 grid-rows-10">
                  ${Array(100)
                    .fill()
                    .map(
                      () =>
                        `<div class="border border-gray-200 ${
                          Math.random() > 0.5 ? "bg-black" : "bg-white"
                        }"></div>`
                    )
                    .join("")}
                </div>
                <!-- Center logo -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-primary">
                    <span class="text-primary text-lg font-bold">ETH</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-3 text-sm text-gray-800 break-all text-center p-2 bg-gray-100 rounded">
              ${address}
            </div>
          `;
      qrCodeContainer.appendChild(qrCode);
    } else if (qrCodeContainer) {
      qrCodeContainer.classList.add("hidden");
    }

    if (modal) {
      modal.classList.remove("hidden");
      const modalContent = modal.querySelector(".modal-content");
      if (modalContent) {
        modalContent.classList.add("scale-100");
        modalContent.classList.remove("scale-90");
      }
    }
  }

  function hideModal() {
    if (!modal) return;

    const modalContentEl = modal.querySelector(".modal-content");
    if (modalContentEl) {
      modalContentEl.classList.add("scale-90");
      modalContentEl.classList.remove("scale-100");
    }

    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
  }

  function showSuccessAnimation(message) {
    if (!successAnimation || !successMessage) return;

    successMessage.textContent = message;
    successAnimation.classList.remove("hidden");

    // Hide the animation after 3 seconds
    setTimeout(() => {
      successAnimation.classList.add("hidden");
    }, 3000);
  }

  function showLoading() {
    if (loadingSpinner) loadingSpinner.classList.remove("hidden");
  }

  function hideLoading() {
    if (loadingSpinner) loadingSpinner.classList.add("hidden");
  }

  function updateStatus(text, isConnected = false) {
    if (!statusEl) return;

    if (isConnected) {
      statusEl.innerHTML = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">${text}</span>`;
      if (connectionIndicator) connectionIndicator.classList.remove("hidden");
    } else {
      statusEl.innerHTML = `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">${text}</span>`;
      if (connectionIndicator) connectionIndicator.classList.add("hidden");
    }
  }

  function shortenAddress(address) {
    return (
      address.substring(0, 6) + "..." + address.substring(address.length - 4)
    );
  }

  // Password verification
  function verifyPassword() {
    return new Promise((resolve, reject) => {
      if (!passwordModal || !passwordInput || !passwordError) {
        console.error("Password modal elements not found");
        resolve(false);
        return;
      }

      passwordModal.classList.remove("hidden");
      passwordError.classList.add("hidden");
      passwordInput.value = "";

      function handleSubmit() {
        if (passwordInput.value === correctPassword) {
          passwordModal.classList.add("hidden");
          resolve(true);
        } else {
          passwordError.classList.remove("hidden");
        }
      }

      function handleCancel() {
        passwordModal.classList.add("hidden");
        resolve(false);
      }

      if (submitPasswordBtn) {
        submitPasswordBtn.onclick = handleSubmit;
      }

      if (cancelPasswordBtn) {
        cancelPasswordBtn.onclick = handleCancel;
      }

      if (passwordInput) {
        passwordInput.onkeydown = (e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        };
      }
    });
  }

  // NEW: Show transaction notification
  function showTransactionNotification(title, message, type = "received") {
    if (
      !transactionNotification ||
      !notificationTitle ||
      !notificationMessage ||
      !notificationIcon
    )
      return;

    notificationTitle.textContent = title;
    notificationMessage.textContent = message;

    // Set icon based on type
    if (type === "received") {
      notificationIcon.className =
        "flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-300 mr-4";
      notificationIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>`;

      if (notificationProgressBar)
        notificationProgressBar.className = "h-1 bg-green-500";
    } else {
      notificationIcon.className =
        "flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-300 mr-4";
      notificationIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>`;

      if (notificationProgressBar)
        notificationProgressBar.className = "h-1 bg-blue-500";
    }

    // Show notification
    transactionNotification.classList.remove("translate-x-full");
    transactionNotification.classList.add("translate-x-0");

    // Reset and restart progress bar animation
    if (notificationProgressBar) {
      notificationProgressBar.style.animation = "none";
      void notificationProgressBar.offsetWidth; // Trigger reflow
      notificationProgressBar.style.animation = "progress 5s linear forwards";
    }

    // Hide after 5 seconds
    setTimeout(() => {
      transactionNotification.classList.remove("translate-x-0");
      transactionNotification.classList.add("translate-x-full");
    }, 5000);
  }

  // Contact book functions
  function displayContacts() {
    if (!contactsList) return;

    contactsList.innerHTML = "";

    if (contacts.length === 0) {
      contactsList.innerHTML =
        '<div class="py-2 px-3 text-center text-gray-500 dark:text-gray-400">No contacts found</div>';
      return;
    }

    contacts.forEach((contact) => {
      const contactElement = document.createElement("div");
      contactElement.className =
        "contact-item py-2 px-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded";
      contactElement.innerHTML = `
            <div class="flex justify-between items-center">
              <div>
                <div class="font-medium">${contact.name}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">${shortenAddress(
                  contact.address
                )}</div>
              </div>
              <button class="edit-contact text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>
          `;

      // Click to select contact
      contactElement.onclick = (e) => {
        if (!e.target.closest(".edit-contact")) {
          // Check which input field is active
          const activeField = document.activeElement;
          if (
            activeField === recipientInput ||
            (contactBook && contactBook.dataset.target === "recipient")
          ) {
            if (recipientInput) recipientInput.value = contact.address;
          } else if (
            activeField === contractRecipientInput ||
            (contactBook && contactBook.dataset.target === "contractRecipient")
          ) {
            if (contractRecipientInput)
              contractRecipientInput.value = contact.address;
          }

          if (contactBook) contactBook.classList.add("hidden");
        }
      };

      // Edit contact
      const editBtn = contactElement.querySelector(".edit-contact");
      if (editBtn) {
        editBtn.onclick = (e) => {
          e.stopPropagation();
          showEditContactModal(contact);
        };
      }

      contactsList.appendChild(contactElement);
    });
  }

  function showAddContactModal() {
    if (!addContactModal || !contactName || !contactAddress || !contactError)
      return;

    contactName.value = "";
    contactAddress.value = "";
    contactError.classList.add("hidden");

    addContactModal.classList.remove("hidden");
    contactName.focus();
  }

  function hideAddContactModal() {
    if (addContactModal) addContactModal.classList.add("hidden");
  }

  function showEditContactModal(contact) {
    if (
      !editContactModal ||
      !editContactName ||
      !editContactAddress ||
      !editContactId ||
      !editContactError
    )
      return;

    editContactName.value = contact.name;
    editContactAddress.value = contact.address;
    editContactId.value = contact.id;
    editContactError.classList.add("hidden");

    editContactModal.classList.remove("hidden");
    editContactName.focus();
  }

  function hideEditContactModal() {
    if (editContactModal) editContactModal.classList.add("hidden");
  }

  function addContact() {
    if (!contactName || !contactAddress || !contactError) return;

    const name = contactName.value.trim();
    const address = contactAddress.value.trim();

    if (!name) {
      contactError.textContent = "Please enter a name";
      contactError.classList.remove("hidden");
      return;
    }

    // Basic address validation
    if (!address || address.length < 42) {
      contactError.textContent = "Please enter a valid Ethereum address";
      contactError.classList.remove("hidden");
      return;
    }

    const newId =
      contacts.length > 0 ? Math.max(...contacts.map((c) => c.id)) + 1 : 1;
    contacts.push({ id: newId, name, address });

    hideAddContactModal();
    displayContacts();

    // Show a success animation
    showSuccessAnimation(`Contact "${name}" has been added`);
  }

  function updateContact() {
    if (
      !editContactId ||
      !editContactName ||
      !editContactAddress ||
      !editContactError
    )
      return;

    const id = parseInt(editContactId.value);
    const name = editContactName.value.trim();
    const address = editContactAddress.value.trim();

    if (!name) {
      editContactError.textContent = "Please enter a name";
      editContactError.classList.remove("hidden");
      return;
    }

    // Basic address validation
    if (!address || address.length < 42) {
      editContactError.textContent = "Please enter a valid Ethereum address";
      editContactError.classList.remove("hidden");
      return;
    }

    const contactIndex = contacts.findIndex((c) => c.id === id);
    if (contactIndex !== -1) {
      contacts[contactIndex] = { id, name, address };
    }

    hideEditContactModal();
    displayContacts();

    // Show a success animation
    showSuccessAnimation(`Contact "${name}" has been updated`);
  }

  function deleteContact() {
    if (!editContactId) return;

    const id = parseInt(editContactId.value);
    const contactToDelete = contacts.find((c) => c.id === id);

    if (!contactToDelete) return;

    contacts = contacts.filter((c) => c.id !== id);

    hideEditContactModal();
    displayContacts();

    // Show a success animation
    showSuccessAnimation(`Contact "${contactToDelete.name}" has been deleted`);
  }

  // Currency converter functions
  function showConverterModal() {
    if (!converterModal || !cryptoAmount || !cryptoType || !fiatType) return;

    converterModal.classList.remove("hidden");

    // Set default values
    cryptoAmount.value = "1";
    cryptoType.value = "ETH";
    fiatType.value = "USD";

    // Calculate and display fiat amount
    calculateFiatAmount();
  }

  function hideConverterModal() {
    if (converterModal) converterModal.classList.add("hidden");
  }

  function calculateFiatAmount() {
    if (!cryptoType || !fiatType || !cryptoAmount || !fiatAmount) return;

    const crypto = cryptoType.value;
    const fiat = fiatType.value;
    const amount = parseFloat(cryptoAmount.value) || 0;

    const rate = exchangeRates[crypto][fiat] || 0;
    fiatAmount.value = (amount * rate).toFixed(2);
  }

  function calculateCryptoAmount() {
    if (!cryptoType || !fiatType || !cryptoAmount || !fiatAmount) return;

    const crypto = cryptoType.value;
    const fiat = fiatType.value;
    const amount = parseFloat(fiatAmount.value) || 0;

    const rate = exchangeRates[crypto][fiat] || 0;
    cryptoAmount.value = (amount / rate).toFixed(6);
  }

  // QR Code functions
  function showQRModal() {
    if (!connected) {
      showModal("Error", "Please connect your wallet first");
      return;
    }

    showModal(
      "Your Wallet Address",
      `Share this address to receive funds`,
      true,
      account
    );
  }

  // NEW: Help Modal
  function showHelpModal() {
    if (helpModal) helpModal.classList.remove("hidden");
  }

  function hideHelpModal() {
    if (helpModal) helpModal.classList.add("hidden");
  }

  // NEW: Balance visibility toggle
  function toggleBalanceVisibility() {
    if (!accountBalance) return;

    balanceVisible = !balanceVisible;

    if (balanceVisible) {
      accountBalance.classList.remove("balance-hidden");
      if (toggleBalanceVisibilityBtn) {
        toggleBalanceVisibilityBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            `;
      }
    } else {
      accountBalance.classList.add("balance-hidden");
      if (toggleBalanceVisibilityBtn) {
        toggleBalanceVisibilityBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            `;
      }
    }
  }

  // NEW: Change Password Modal
  function showChangePasswordModal() {
    if (changePasswordModal) {
      if (currentPassword) currentPassword.value = "";
      if (newPassword) newPassword.value = "";
      if (confirmPassword) confirmPassword.value = "";
      if (passwordChangeError) passwordChangeError.classList.add("hidden");

      changePasswordModal.classList.remove("hidden");
      if (currentPassword) currentPassword.focus();
    }
  }

  function hideChangePasswordModal() {
    if (changePasswordModal) changePasswordModal.classList.add("hidden");
  }

  function updatePassword() {
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword ||
      !passwordChangeError
    )
      return;

    const current = currentPassword.value;
    const newPass = newPassword.value;
    const confirm = confirmPassword.value;

    // Validate current password
    if (current !== correctPassword) {
      passwordChangeError.textContent = "Incorrect current password";
      passwordChangeError.classList.remove("hidden");
      return;
    }

    // Validate new password
    if (newPass.length < 4) {
      passwordChangeError.textContent =
        "New password must be at least 4 characters";
      passwordChangeError.classList.remove("hidden");
      return;
    }

    // Confirm passwords match
    if (newPass !== confirm) {
      passwordChangeError.textContent = "Passwords do not match";
      passwordChangeError.classList.remove("hidden");
      return;
    }

    // Update password (in a real app, this would call an API)
    correctPassword = newPass;

    // Hide modal
    hideChangePasswordModal();

    // Show success
    showSuccessAnimation("Password updated successfully");
  }

  // NEW: 2FA Modal
  function showTwoFactorModal() {
    if (twoFactorModal) {
      if (verificationCode) verificationCode.value = "";
      if (twoFactorError) twoFactorError.classList.add("hidden");

      twoFactorModal.classList.remove("hidden");
      if (verificationCode) verificationCode.focus();
    }
  }

  function hideTwoFactorModal() {
    if (twoFactorModal) twoFactorModal.classList.add("hidden");
  }

  function verifyTwoFactor() {
    if (!verificationCode || !twoFactorError) return;

    const code = verificationCode.value.trim();

    // Validate code (in demo, accept any 6-digit code)
    if (!/^\d{6}$/.test(code)) {
      twoFactorError.textContent = "Please enter a valid 6-digit code";
      twoFactorError.classList.remove("hidden");
      return;
    }

    // Enable 2FA (in a real app, this would call an API)
    if (toggle2fa) {
      toggle2fa.checked = true;
      const toggleLabel = toggle2fa.nextElementSibling;
      if (toggleLabel)
        toggleLabel.className =
          "block overflow-hidden h-5 rounded-full bg-primary cursor-pointer";

      const toggleIndicator = toggleLabel.nextElementSibling;
      if (toggleIndicator)
        toggleIndicator.className =
          "absolute left-5 top-1 h-3 w-3 rounded-full bg-white transition-transform transform";
    }

    // Hide modal
    hideTwoFactorModal();

    // Show success
    showSuccessAnimation("Two-factor authentication enabled");
  }

  // ENHANCED: Search functions with more comprehensive results
  function showMobileSearch() {
    if (mobileSearchOverlay) {
      mobileSearchOverlay.classList.remove("hidden");
      if (mobileSearchInput) mobileSearchInput.focus();
    }
  }

  function hideMobileSearch() {
    if (mobileSearchOverlay) mobileSearchOverlay.classList.add("hidden");
  }

  function performSearch(query, isDesktop = false) {
    // Choose the appropriate container based on whether it's desktop or mobile
    const targetContainer = isDesktop ? desktopSearchResults : searchResults;

    if (!targetContainer) return;

    query = query.trim().toLowerCase();

    if (!query) {
      targetContainer.innerHTML = `
            <div class="text-center text-gray-500 dark:text-gray-400 py-4">
              Type to search transactions, contacts, and settings
            </div>
          `;

      if (isDesktop) {
        targetContainer.classList.remove("show");
        targetContainer.classList.add("hidden");
      }

      return;
    }

    // Show container for desktop search
    if (isDesktop) {
      targetContainer.classList.remove("hidden");
      targetContainer.classList.add("show");
    }

    let results = [];

    // Search transactions
    allTransactions.forEach((tx) => {
      if (
        tx.to.toLowerCase().includes(query) ||
        tx.amount.includes(query) ||
        tx.date.includes(query) ||
        tx.type.toLowerCase().includes(query) ||
        (tx.category && tx.category.toLowerCase().includes(query)) ||
        (tx.note && tx.note.toLowerCase().includes(query))
      ) {
        results.push({
          type: "transaction",
          title: `${
            tx.type.charAt(0).toUpperCase() + tx.type.slice(1)
          } Transaction`,
          subtitle: `${tx.amount} ETH to ${shortenAddress(tx.to)}`,
          date: tx.date,
          category: tx.category || "Transfer",
          note: tx.note || "",
          data: tx,
        });
      }
    });

    // Search contacts
    contacts.forEach((contact) => {
      if (
        contact.name.toLowerCase().includes(query) ||
        contact.address.toLowerCase().includes(query)
      ) {
        results.push({
          type: "contact",
          title: contact.name,
          subtitle: shortenAddress(contact.address),
          data: contact,
        });
      }
    });

    // Search settings (static options)
    const settings = [
      {
        name: "Change Password",
        section: "Security",
        action: "changePassword",
      },
      {
        name: "Two-Factor Authentication",
        section: "Security",
        action: "twoFactor",
      },
      { name: "Auto-Lock Wallet", section: "Security", action: "autoLock" },
      { name: "Transaction Signing", section: "Security", action: "txSigning" },
      {
        name: "Notifications",
        section: "Preferences",
        action: "notifications",
      },
      {
        name: "Currency Display",
        section: "Preferences",
        action: "currencyDisplay",
      },
      {
        name: "Default Currency",
        section: "Preferences",
        action: "defaultCurrency",
      },
      { name: "Default Gas Price", section: "Preferences", action: "gasPrice" },
      { name: "Theme", section: "Appearance", action: "theme" },
      { name: "Accent Color", section: "Appearance", action: "accentColor" },
      { name: "Font Size", section: "Appearance", action: "fontSize" },
      { name: "Profile Settings", section: "Account", action: "profile" },
      { name: "Network Settings", section: "Network", action: "network" },
    ];

    settings.forEach((setting) => {
      if (
        setting.name.toLowerCase().includes(query) ||
        setting.section.toLowerCase().includes(query)
      ) {
        results.push({
          type: "setting",
          title: setting.name,
          subtitle: `${setting.section} settings`,
          section: setting.section,
          action: setting.action,
          data: setting,
        });
      }
    });

    // Display results
    if (results.length === 0) {
      targetContainer.innerHTML = `
            <div class="text-center text-gray-500 dark:text-gray-400 py-4">
              No results found for "${query}"
            </div>
          `;
      return;
    }

    targetContainer.innerHTML = "";

    // Group results by type
    const groupedResults = {
      transaction: { title: "Transactions", items: [] },
      contact: { title: "Contacts", items: [] },
      setting: { title: "Settings", items: [] },
    };

    results.forEach((result) => {
      groupedResults[result.type].items.push(result);
    });

    // Display grouped results
    Object.keys(groupedResults).forEach((type) => {
      const group = groupedResults[type];
      if (group.items.length === 0) return;

      const groupEl = document.createElement("div");
      groupEl.className = "mb-4";

      groupEl.innerHTML = `
            <h3 class="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400 px-3 pt-2">${group.title}</h3>
            <div class="space-y-2"></div>
          `;

      const itemsContainer = groupEl.querySelector(".space-y-2");

      group.items.forEach((item) => {
        const itemEl = document.createElement("div");
        itemEl.className =
          "p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 mx-2";

        // Highlight the matching text
        const titleWithHighlight = item.title.replace(
          new RegExp(query, "gi"),
          (match) => `<span class="search-highlight">${match}</span>`
        );
        const subtitleWithHighlight = item.subtitle.replace(
          new RegExp(query, "gi"),
          (match) => `<span class="search-highlight">${match}</span>`
        );

        switch (item.type) {
          case "transaction":
            let noteHighlight = "";
            if (item.note) {
              noteHighlight = item.note.replace(
                new RegExp(query, "gi"),
                (match) => `<span class="search-highlight">${match}</span>`
              );
              noteHighlight = `<div class="text-xs text-gray-500 dark:text-gray-400 mt-1">${noteHighlight}</div>`;
            }

            itemEl.innerHTML = `
                  <div class="flex items-center">
                    <div class="h-8 w-8 rounded-full flex items-center justify-center ${
                      item.data.type === "incoming"
                        ? "bg-green-100 text-green-500 dark:bg-green-900/30 dark:text-green-300"
                        : item.data.type === "outgoing"
                        ? "bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-300"
                        : "bg-blue-100 text-blue-500 dark:bg-blue-900/30 dark:text-blue-300"
                    } mr-3">
                      ${
                        item.data.type === "incoming"
                          ? "↓"
                          : item.data.type === "outgoing"
                          ? "↑"
                          : "⚙️"
                      }
                    </div>
                    <div class="flex-1">
                      <div class="font-medium">${titleWithHighlight}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">${subtitleWithHighlight}</div>
                      ${noteHighlight}
                      <div class="flex mt-1">
                        <span class="text-xs px-2 py-0.5 rounded-full ${
                          item.data.category === "Transfer"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : item.data.category === "Investment"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : item.data.category === "NFT"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                            : item.data.category === "DeFi"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        }">${item.category}</span>
                        <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">${
                          item.date
                        }</span>
                      </div>
                    </div>
                  </div>
                `;
            break;
          case "contact":
            itemEl.innerHTML = `
                  <div class="flex items-center">
                    <div class="h-8 w-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <div class="font-medium">${titleWithHighlight}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">${subtitleWithHighlight}</div>
                    </div>
                    <div class="text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                      </svg>
                    </div>
                  </div>
                `;
            break;
          case "setting":
            let iconPath;
            switch (item.section) {
              case "Security":
                iconPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />`;
                break;
              case "Preferences":
                iconPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />`;
                break;
              case "Appearance":
                iconPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />`;
                break;
              case "Account":
                iconPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />`;
                break;
              case "Network":
                iconPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`;
                break;
              default:
                iconPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />`;
            }

            itemEl.innerHTML = `
                  <div class="flex items-center">
                    <div class="h-8 w-8 rounded-full flex items-center justify-center bg-primary bg-opacity-10 text-primary mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        ${iconPath}
                      </svg>
                    </div>
                    <div class="flex-1">
                      <div class="font-medium">${titleWithHighlight}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">${subtitleWithHighlight}</div>
                    </div>
                    <div class="text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                `;
            break;
        }

        // Add click handler for search results
        itemEl.addEventListener("click", () => {
          // Handle the click based on result type
          switch (item.type) {
            case "contact":
              // Open the edit contact modal
              showEditContactModal(item.data);
              if (isDesktop) {
                // Hide desktop search results on click
                desktopSearchResults.classList.remove("show");
                desktopSearchResults.classList.add("hidden");
                if (searchInput) searchInput.value = "";
              } else {
                hideMobileSearch();
              }
              break;
            case "setting":
              // Navigate to the specific setting
              accountTab.click();
              if (isDesktop) {
                // Hide desktop search results on click
                desktopSearchResults.classList.remove("show");
                desktopSearchResults.classList.add("hidden");
                if (searchInput) searchInput.value = "";
              } else {
                hideMobileSearch();
              }

              // Handle specific setting actions
              switch (item.action) {
                case "changePassword":
                  setTimeout(() => showChangePasswordModal(), 300);
                  break;
                case "twoFactor":
                  setTimeout(() => {
                    toggle2fa.checked = !toggle2fa.checked;
                    if (toggle2fa.checked) showTwoFactorModal();
                  }, 300);
                  break;
                case "profile":
                  setTimeout(() => showProfileModal(), 300);
                  break;
                case "network":
                  setTimeout(() => toggleNetworkPanel(), 300);
                  break;
              }
              break;
            case "transaction":
              // Navigate to the transaction history and highlight the transaction
              historyTab.click();
              if (isDesktop) {
                // Hide desktop search results on click
                desktopSearchResults.classList.remove("show");
                desktopSearchResults.classList.add("hidden");
                if (searchInput) searchInput.value = "";
              } else {
                hideMobileSearch();
              }

              // Add highlighting logic for the specific transaction
              setTimeout(() => {
                const transactions = document.getElementById("transactions");
                if (transactions) {
                  const txElements = transactions.querySelectorAll("div");

                  // Find and highlight the transaction
                  for (let i = 0; i < txElements.length; i++) {
                    const tx = txElements[i];
                    if (
                      tx.textContent.includes(item.data.amount) &&
                      tx.textContent.includes(item.data.date)
                    ) {
                      tx.classList.add("border", "border-primary");
                      tx.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });

                      // Remove highlight after 2 seconds
                      setTimeout(() => {
                        tx.classList.remove("border", "border-primary");
                      }, 2000);
                      break;
                    }
                  }
                }
              }, 300);
              break;
          }
        });

        itemsContainer.appendChild(itemEl);
      });

      targetContainer.appendChild(groupEl);
    });
  }

  // Connect wallet
  async function toggleWallet() {
    if (!connected) {
      const passwordVerified = await verifyPassword();
      if (!passwordVerified) return;

      try {
        showLoading();

        if (window.ethereum) {
          provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          signer = provider.getSigner();
          account = await signer.getAddress();

          // Initialize contract
          contract = new ethers.Contract(contractAddress, contractABI, signer);

          updateStatus(`Connected: ${shortenAddress(account)}`, true);
          if (walletButton)
            walletButton.innerHTML = '<span class="mr-2">❌</span> Disconnect';
          connected = true;

          // Enable buttons
          if (sendBtn) sendBtn.disabled = false;
          if (withdrawBtn) withdrawBtn.disabled = false;
          if (sendContractBtn) sendContractBtn.disabled = false;

          // Update balance
          updateBalance();

          // Update user profile with connected address
          userProfile.address = account;
          userProfile.connected = true;
          updateProfileDisplay();

          // Add a notification
          addNotification(
            "Wallet Connected",
            "Your wallet has been successfully connected.",
            "blue"
          );

          // Show success animation
          showSuccessAnimation("Wallet connected successfully");
        } else {
          showModal("Error", "Please install MetaMask to connect your wallet.");
        }
      } catch (error) {
        console.error("Connection error:", error);
        showModal(
          "Connection Error",
          error.message || "Failed to connect wallet"
        );
      } finally {
        hideLoading();
      }
    } else {
      // "Disconnect" wallet (simulate disconnect)
      provider = null;
      signer = null;
      contract = null;
      account = null;
      connected = false;

      // Update user profile
      userProfile.address = "";
      userProfile.connected = false;
      updateProfileDisplay();

      updateStatus("Not connected");
      if (walletButton)
        walletButton.innerHTML = '<span class="mr-2">🔌</span> Connect';

      // Disable buttons
      if (sendBtn) sendBtn.disabled = true;
      if (withdrawBtn) withdrawBtn.disabled = true;
      if (sendContractBtn) sendContractBtn.disabled = true;
    }
  }

  // Update wallet balance
  async function updateBalance() {
    try {
      if (connected && signer && accountBalance) {
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        const ethBalance = ethers.utils.formatEther(balance);
        accountBalance.textContent = `${parseFloat(ethBalance).toFixed(4)} ETH`;

        // Add shimmer effect
        accountBalance.classList.add("shimmer");
        setTimeout(() => {
          accountBalance.classList.remove("shimmer");
        }, 3000);
      } else if (accountBalance) {
        accountBalance.textContent = `0.00 ETH`;
      }
    } catch (err) {
      console.error("Error fetching balance:", err);
      if (accountBalance) accountBalance.textContent = `Error`;
    }
  }

  // Send ETH directly from wallet to wallet
  async function sendEth() {
    if (!connected) {
      showModal("Error", "Please connect your wallet first");
      return;
    }

    if (!recipientInput || !amountInput) {
      showModal("Error", "Form elements not found");
      return;
    }

    const recipient = recipientInput.value.trim();
    const amount = amountInput.value.trim();

    // Basic address validation
    if (!recipient || recipient.length < 42) {
      showModal("Error", "Invalid recipient address");
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      showModal("Error", "Please enter a valid amount");
      return;
    }

    try {
      showLoading();

      // Get selected category
      const selectedCategory = document.querySelector(
        ".category-pill.bg-blue-500"
      )
        ? document
            .querySelector(".category-pill.bg-blue-500")
            .textContent.trim()
        : "Transfer";

      // Get note if any
      const note = txNote ? txNote.value.trim() : "";

      // Send ETH directly from user's wallet (no gas fee specification)
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.utils.parseEther(amount),
      });

      // Wait for transaction
      await tx.wait();

      // Add to transaction history with current local date (FIXED date issue here)
      allTransactions.unshift({
        to: recipient,
        amount: amount,
        date: new Date().toLocaleDateString(),
        type: "outgoing",
        category: selectedCategory,
        note: note,
      });

      // Add a notification
      addNotification(
        "Transaction Successful",
        `Sent ${amount} ETH to ${shortenAddress(recipient)}`,
        "green"
      );

      // Show transaction notification
      showTransactionNotification(
        "Transaction Sent",
        `Sent ${amount} ETH to ${shortenAddress(recipient)}`,
        "sent"
      );

      // Show success animation instead of modal
      showSuccessAnimation(
        `Successfully sent ${amount} ETH to ${shortenAddress(recipient)}`
      );

      // Clear inputs
      recipientInput.value = "";
      amountInput.value = "";
      if (txNote) txNote.value = "";

      // Update balance
      updateBalance();
    } catch (error) {
      console.error("Transaction error:", error);
      showModal("Transaction Error", "Failed to send ETH");
    } finally {
      hideLoading();
    }
  }

  // Withdraw funds from contract
  async function withdrawFunds() {
    if (!connected || !contract) {
      showModal("Error", "Please connect your wallet first");
      return;
    }

    try {
      showLoading();

      const tx = await contract.withdraw(ethers.utils.parseEther("0.01"));
      await tx.wait();

      // Add to transaction history with local date
      allTransactions.unshift({
        to: account,
        amount: "0.01",
        date: new Date().toLocaleDateString(),
        type: "contract",
        category: "Transfer",
      });

      // Add a notification
      addNotification(
        "Contract Interaction",
        "Successfully withdrew 0.01 ETH from the contract",
        "green"
      );

      // Show success animation instead of modal
      showSuccessAnimation("Successfully withdrew 0.01 ETH from the contract");

      // Update balance
      updateBalance();
    } catch (error) {
      console.error("Withdrawal error:", error);
      showModal("Withdrawal Error", "Failed to withdraw funds ❌");
    } finally {
      hideLoading();
    }
  }

  // Send funds from contract
  async function sendFundsFromContract() {
    if (!connected || !contract) {
      showModal("Error", "Please connect your wallet first");
      return;
    }

    if (!contractRecipientInput || !contractAmountInput) {
      showModal("Error", "Form elements not found");
      return;
    }

    const recipient = contractRecipientInput.value.trim();
    const amount = contractAmountInput.value.trim();

    // Basic address validation
    if (!recipient || recipient.length < 42) {
      showModal("Error", "Invalid recipient address");
      return;
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      showModal("Error", "Please enter a valid amount");
      return;
    }

    try {
      showLoading();

      const tx = await contract.sendFunds(
        recipient,
        ethers.utils.parseEther(amount)
      );
      await tx.wait();

      // Add to transaction history with local date
      allTransactions.unshift({
        to: recipient,
        amount: amount,
        date: new Date().toLocaleDateString(),
        type: "contract",
        category: "Contract",
      });

      // Add a notification
      addNotification(
        "Contract Interaction",
        `Sent ${amount} ETH from contract`,
        "green"
      );

      // Show success animation instead of modal
      showSuccessAnimation(
        `Successfully sent ${amount} ETH from contract to ${shortenAddress(
          recipient
        )}`
      );

      // Clear inputs
      contractRecipientInput.value = "";
      contractAmountInput.value = "";
    } catch (error) {
      console.error("Contract transaction error:", error);
      showModal("Transaction Error", "Failed to send funds from contract ❌");
    } finally {
      hideLoading();
    }
  }

  // Display transaction history
  function displayTransactions() {
    const transactionsContainer = getElement("transactions");
    if (!transactionsContainer) return;

    transactionsContainer.innerHTML = "";

    if (allTransactions.length === 0) {
      transactionsContainer.innerHTML =
        '<p class="text-center text-gray-500 dark:text-gray-400 py-4">No transactions found.</p>';
      return;
    }

    allTransactions.forEach((tx) => {
      // Find contact name if available
      const contact = contacts.find(
        (c) => c.address && c.address.toLowerCase() === tx.to.toLowerCase()
      );
      const displayName = contact ? contact.name : shortenAddress(tx.to);

      const txElement = document.createElement("div");
      txElement.className =
        "p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-2 hover:shadow-md transition-all duration-300";

      let icon, colorClass, categoryColor;
      switch (tx.type) {
        case "incoming":
          icon = "↓";
          colorClass = "text-green-500";
          break;
        case "outgoing":
          icon = "↑";
          colorClass = "text-red-500";
          break;
        case "contract":
          icon = "⚙️";
          colorClass = "text-blue-500";
          break;
        default:
          icon = "•";
          colorClass = "text-gray-500";
      }

      // Set category color
      switch (tx.category) {
        case "Transfer":
          categoryColor =
            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
          break;
        case "Investment":
          categoryColor =
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
          break;
        case "NFT":
          categoryColor =
            "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
          break;
        case "DeFi":
          categoryColor =
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
          break;
        default:
          categoryColor =
            "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      }

      txElement.innerHTML = `
            <div class="flex justify-between">
              <div class="flex items-center">
                <div class="flex items-center justify-center mr-3 ${colorClass} text-lg font-bold h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700">${icon}</div>
                <div class="text-sm">
                  <div class="font-medium">${displayName}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">${
                    tx.date
                  }</div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-medium ${colorClass}">${tx.amount} ETH</div>
                <span class="px-2 py-1 rounded-full text-xs ${categoryColor} inline-block mt-1">${
        tx.category || "Transfer"
      }</span>
              </div>
            </div>
            ${
              tx.note
                ? `<div class="mt-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-2">${tx.note}</div>`
                : ""
            }
          `;

      transactionsContainer.appendChild(txElement);
    });
  }

  // Download transaction history
  function downloadTransactions() {
    try {
      // Check if jsPDF is available
      if (
        typeof window.jspdf === "undefined" ||
        typeof window.jspdf.jsPDF === "undefined"
      ) {
        showModal("Error", "PDF library not loaded. Please try again later.");
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Transaction Receipt", 15, 20);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 15, 30);
      doc.line(15, 32, 195, 32);

      let y = 40;
      allTransactions.forEach((tx, i) => {
        const contact = contacts.find(
          (c) => c.address && c.address.toLowerCase() === tx.to.toLowerCase()
        );
        const displayName = contact
          ? `${contact.name} (${shortenAddress(tx.to)})`
          : tx.to;

        doc.setFont("helvetica", "bold");
        doc.text(`Transaction #${i + 1}`, 15, y);
        doc.setFont("helvetica", "normal");
        doc.text(`To         : ${displayName}`, 20, y + 8);
        doc.text(`Amount     : ${tx.amount} ETH`, 20, y + 16);
        doc.text(`Date       : ${tx.date}`, 20, y + 24);
        doc.text(`Type       : ${tx.type}`, 20, y + 32);
        doc.text(`Category   : ${tx.category || "Transfer"}`, 20, y + 40);
        if (tx.note) {
          doc.text(`Note       : ${tx.note}`, 20, y + 48);
          y += 8; // Add extra space for note
        }
        doc.line(15, y + 48, 195, y + 48);
        y += 56;

        // Auto add new page if needed
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });

      doc.save("Chain_Wallet_Transactions.pdf");
    } catch (error) {
      console.error("Download error:", error);
      showModal("Download Error", "Failed to download transaction history ❌");
    }
  }

  // NEW: Profile functions
  function showProfileModal() {
    if (!profileModal || !profileName || !profileBio) return;

    profileName.value = userProfile.name;
    profileBio.value = userProfile.bio;

    // Set profile image preview if available
    if (userProfile.profileImage && profilePreview) {
      profilePreview.style.backgroundImage = `url(${userProfile.profileImage})`;
      profilePreview.querySelector("svg").classList.add("hidden");
    } else if (profilePreview) {
      profilePreview.style.backgroundImage = "";
      profilePreview.querySelector("svg").classList.remove("hidden");
    }

    profileModal.classList.remove("hidden");
  }

  function hideProfileModal() {
    if (profileModal) profileModal.classList.add("hidden");
  }

  function handleProfileImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      showModal("Error", "Please select an image file");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showModal("Error", "Image file size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imgData = event.target.result;

      // Update preview
      if (profilePreview) {
        profilePreview.style.backgroundImage = `url(${imgData})`;
        if (profilePreview.querySelector("svg")) {
          profilePreview.querySelector("svg").classList.add("hidden");
        }
      }
    };
    reader.readAsDataURL(file);
  }

  function saveProfile() {
    if (!profileName) return;

    const name = profileName.value.trim();
    const bio = profileBio ? profileBio.value.trim() : "";

    if (!name) {
      showModal("Error", "Please enter a display name");
      return;
    }

    // Save profile data
    userProfile.name = name;
    userProfile.bio = bio;

    // Save profile image if available
    if (profilePreview && profilePreview.style.backgroundImage) {
      const imgUrl = profilePreview.style.backgroundImage
        .slice(4, -1)
        .replace(/"/g, "");
      userProfile.profileImage = imgUrl;
    }

    // Update UI
    updateProfileDisplay();

    // Hide modal
    hideProfileModal();

    // Show success message
    showSuccessAnimation("Profile updated successfully");
  }

  function updateProfileDisplay() {
    // Update header profile button
    if (profileBtn) {
      if (userProfile.profileImage) {
        profileBtn.innerHTML = "";
        profileBtn.style.backgroundImage = `url(${userProfile.profileImage})`;
      } else {
        profileBtn.style.backgroundImage = "";
        profileBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" class="h-full w-full text-gray-600 dark:text-gray-300 p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            `;
      }
    }

    // Update account panel profile section
    if (profileImageContainer) {
      if (userProfile.profileImage) {
        profileImageContainer.innerHTML = "";
        profileImageContainer.style.backgroundImage = `url(${userProfile.profileImage})`;
      } else {
        profileImageContainer.style.backgroundImage = "";
        profileImageContainer.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            `;
      }
    }

    // Update name and address
    if (profileNameEl) profileNameEl.textContent = userProfile.name;
    if (profileAddressEl) {
      if (userProfile.connected && userProfile.address) {
        profileAddressEl.textContent = shortenAddress(userProfile.address);
      } else {
        profileAddressEl.textContent = "Connect wallet to view address";
      }
    }
  }

  // NEW: Notification functions
  function toggleNotifications() {
    if (notificationsPanel) {
      if (notificationsPanel.classList.contains("hidden")) {
        // Show panel
        notificationsPanel.classList.remove("hidden");
        setTimeout(() => {
          notificationsPanel.classList.add("scale-100");
          notificationsPanel.classList.remove("scale-0");
        }, 10);

        // Hide notification badge
        if (notificationBadge) notificationBadge.classList.add("hidden");
      } else {
        // Hide panel
        notificationsPanel.classList.remove("scale-100");
        notificationsPanel.classList.add("scale-0");
        setTimeout(() => {
          notificationsPanel.classList.add("hidden");
        }, 300);
      }
    }
  }

  function addNotification(title, message, type = "gray") {
    // Create new notification
    const timestamp = new Date();
    const timeAgo = "Just now";

    let bgClass;
    switch (type) {
      case "blue":
        bgClass = "bg-blue-50 dark:bg-blue-900/30";
        break;
      case "green":
        bgClass = "bg-green-50 dark:bg-green-900/30";
        break;
      case "red":
        bgClass = "bg-red-50 dark:bg-red-900/30";
        break;
      case "yellow":
        bgClass = "bg-yellow-50 dark:bg-yellow-900/30";
        break;
      default:
        bgClass = "bg-gray-50 dark:bg-gray-700";
    }

    // Add to notifications list
    if (notificationsList) {
      const notificationEl = document.createElement("div");
      notificationEl.className = `${bgClass} p-3 rounded-lg mb-2`;
      notificationEl.innerHTML = `
            <div class="flex justify-between items-start">
              <div class="font-medium text-sm">${title}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">${timeAgo}</div>
            </div>
            <p class="text-xs mt-1">${message}</p>
          `;

      // Add to the beginning of the list
      notificationsList.insertBefore(
        notificationEl,
        notificationsList.firstChild
      );
    }

    // Show notification badge
    if (notificationBadge) notificationBadge.classList.remove("hidden");
  }

  // NEW: Transaction category functions
  function selectTransactionCategory(e) {
    const categoryPill = e.currentTarget;

    // Remove active class from all pills
    document.querySelectorAll(".category-pill").forEach((pill) => {
      pill.classList.remove("bg-blue-500", "text-white");

      // Reset original colors based on data attribute
      if (pill.dataset.category) {
        switch (pill.dataset.category) {
          case "Transfer":
            pill.className =
              "category-pill px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 cursor-pointer";
            break;
          case "Investment":
            pill.className =
              "category-pill px-3 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 cursor-pointer";
            break;
          case "NFT":
            pill.className =
              "category-pill px-3 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 cursor-pointer";
            break;
          case "DeFi":
            pill.className =
              "category-pill px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 cursor-pointer";
            break;
          default:
            pill.className =
              "category-pill px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 cursor-pointer";
        }
      } else {
        pill.className =
          "category-pill px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 cursor-pointer";
      }
    });

    // Set active pill
    categoryPill.classList.remove(
      "bg-blue-100",
      "bg-green-100",
      "bg-purple-100",
      "bg-yellow-100",
      "bg-gray-100"
    );
    categoryPill.classList.remove(
      "text-blue-800",
      "text-green-800",
      "text-purple-800",
      "text-yellow-800",
      "text-gray-800"
    );
    categoryPill.classList.remove(
      "dark:bg-blue-900",
      "dark:bg-green-900",
      "dark:bg-purple-900",
      "dark:bg-yellow-900",
      "dark:bg-gray-700"
    );
    categoryPill.classList.remove(
      "dark:text-blue-200",
      "dark:text-green-200",
      "dark:text-purple-200",
      "dark:text-yellow-200",
      "dark:text-gray-200"
    );

    categoryPill.classList.add("bg-blue-500", "text-white");
  }

  // NEW: Network functions
  function toggleNetworkPanel() {
    if (networkPanel) {
      if (networkPanel.classList.contains("hidden")) {
        // Show panel
        networkPanel.classList.remove("hidden");
        setTimeout(() => {
          networkPanel.classList.add("scale-100");
          networkPanel.classList.remove("scale-0");
        }, 10);
      } else {
        // Hide panel
        networkPanel.classList.remove("scale-100");
        networkPanel.classList.add("scale-0");
        setTimeout(() => {
          networkPanel.classList.add("hidden");
        }, 300);
      }
    }
  }

  // Background animation
  const bg = document.getElementById("animated-background");
  if (bg) {
    document.addEventListener("mousemove", (e) => {
      if (window.innerWidth > 768) {
        // Only on desktop
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        bg.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
      }
    });
  }

  // NEW: Toggle 2FA
  function handle2FAToggle(e) {
    if (e.target.checked) {
      // Show 2FA setup modal
      showTwoFactorModal();
    }
  }

  // Safely attach event listeners (only if element exists)
  function addClickListener(element, handler) {
    if (element) {
      element.addEventListener("click", handler);
      console.log(`Event listener added to ${element.id || "unnamed element"}`);
    }
  }

  // Attach all event listeners

  // Toggle theme
  addClickListener(themeToggleBtn, () => {
    document.documentElement.classList.toggle("dark");
  });

  // Tab switching
  addClickListener(sendTab, () => {
    if (sendTab && contractTab && historyTab && accountTab) {
      sendTab.classList.add("border-primary");
      contractTab.classList.remove("border-primary");
      historyTab.classList.remove("border-primary");
      accountTab.classList.remove("border-primary");

      sendTab.setAttribute("aria-selected", "true");
      contractTab.setAttribute("aria-selected", "false");
      historyTab.setAttribute("aria-selected", "false");
      accountTab.setAttribute("aria-selected", "false");
    }

    if (sendPanel && contractPanel && historyPanel && accountPanel) {
      sendPanel.classList.remove("hidden");
      contractPanel.classList.add("hidden");
      historyPanel.classList.add("hidden");
      accountPanel.classList.add("hidden");
    }
  });

  addClickListener(contractTab, () => {
    if (sendTab && contractTab && historyTab && accountTab) {
      sendTab.classList.remove("border-primary");
      contractTab.classList.add("border-primary");
      historyTab.classList.remove("border-primary");
      accountTab.classList.remove("border-primary");

      sendTab.setAttribute("aria-selected", "false");
      contractTab.setAttribute("aria-selected", "true");
      historyTab.setAttribute("aria-selected", "false");
      accountTab.setAttribute("aria-selected", "false");
    }

    if (sendPanel && contractPanel && historyPanel && accountPanel) {
      sendPanel.classList.add("hidden");
      contractPanel.classList.remove("hidden");
      historyPanel.classList.add("hidden");
      accountPanel.classList.add("hidden");
    }
  });

  addClickListener(historyTab, () => {
    if (sendTab && contractTab && historyTab && accountTab) {
      sendTab.classList.remove("border-primary");
      contractTab.classList.remove("border-primary");
      historyTab.classList.add("border-primary");
      accountTab.classList.remove("border-primary");

      sendTab.setAttribute("aria-selected", "false");
      contractTab.setAttribute("aria-selected", "false");
      historyTab.setAttribute("aria-selected", "true");
      accountTab.setAttribute("aria-selected", "false");
    }

    if (sendPanel && contractPanel && historyPanel && accountPanel) {
      sendPanel.classList.add("hidden");
      contractPanel.classList.add("hidden");
      historyPanel.classList.remove("hidden");
      accountPanel.classList.add("hidden");
    }

    displayTransactions();
  });

  addClickListener(accountTab, () => {
    if (sendTab && contractTab && historyTab && accountTab) {
      sendTab.classList.remove("border-primary");
      contractTab.classList.remove("border-primary");
      historyTab.classList.remove("border-primary");
      accountTab.classList.add("border-primary");

      sendTab.setAttribute("aria-selected", "false");
      contractTab.setAttribute("aria-selected", "false");
      historyTab.setAttribute("aria-selected", "false");
      accountTab.setAttribute("aria-selected", "true");
    }

    if (sendPanel && contractPanel && historyPanel && accountPanel) {
      sendPanel.classList.add("hidden");
      contractPanel.classList.add("hidden");
      historyPanel.classList.add("hidden");
      accountPanel.classList.remove("hidden");
    }
  });

  // Address book events
  addClickListener(addressBookBtn, () => {
    if (contactBook) {
      contactBook.classList.toggle("hidden");
      contactBook.dataset.target = "recipient";
      displayContacts();
    }
  });

  addClickListener(contractAddressBookBtn, () => {
    if (contactBook) {
      contactBook.classList.toggle("hidden");
      contactBook.dataset.target = "contractRecipient";
      displayContacts();
    }
  });

  // Close contact book when clicking outside
  document.addEventListener("click", (e) => {
    if (
      contactBook &&
      !e.target.closest("#contactBook") &&
      !e.target.closest("#addressBookBtn") &&
      !e.target.closest("#contractAddressBookBtn")
    ) {
      contactBook.classList.add("hidden");
    }

    // Close notifications panel when clicking outside
    if (
      notificationsPanel &&
      !e.target.closest("#notificationsPanel") &&
      !e.target.closest("#notificationsBtn")
    ) {
      notificationsPanel.classList.remove("scale-100");
      notificationsPanel.classList.add("scale-0");
      setTimeout(() => {
        notificationsPanel.classList.add("hidden");
      }, 300);
    }

    // Close network panel when clicking outside
    if (
      networkPanel &&
      !e.target.closest("#networkPanel") &&
      !e.target.closest("#networkSelector")
    ) {
      networkPanel.classList.remove("scale-100");
      networkPanel.classList.add("scale-0");
      setTimeout(() => {
        networkPanel.classList.add("hidden");
      }, 300);
    }

    // Close desktop search results when clicking outside
    if (
      desktopSearchResults &&
      !e.target.closest("#desktopSearchResults") &&
      !e.target.closest("#searchInput")
    ) {
      desktopSearchResults.classList.remove("show");
      setTimeout(() => {
        desktopSearchResults.classList.add("hidden");
      }, 300);
    }
  });

  // Contact book actions
  addClickListener(addContactBtn, showAddContactModal);
  addClickListener(closeAddContactModal, hideAddContactModal);
  addClickListener(cancelAddContactBtn, hideAddContactModal);
  addClickListener(saveContactBtn, addContact);

  addClickListener(closeEditContactModal, hideEditContactModal);
  addClickListener(cancelEditContactBtn, hideEditContactModal);
  addClickListener(updateContactBtn, updateContact);
  addClickListener(deleteContactBtn, deleteContact);

  // Currency converter events
  addClickListener(btnCalculator, showConverterModal);
  addClickListener(closeConverterModal, hideConverterModal);
  addClickListener(converterOkBtn, hideConverterModal);

  if (cryptoAmount) {
    cryptoAmount.addEventListener("input", calculateFiatAmount);
  }

  if (cryptoType) {
    cryptoType.addEventListener("change", calculateFiatAmount);
  }

  if (fiatAmount) {
    fiatAmount.addEventListener("input", calculateCryptoAmount);
  }

  if (fiatType) {
    fiatType.addEventListener("change", calculateFiatAmount);
  }

  addClickListener(swapCurrencies, () => {
    if (!cryptoAmount || !fiatAmount) return;

    const tempCrypto = cryptoAmount.value;
    cryptoAmount.value = fiatAmount.value;
    fiatAmount.value = tempCrypto;

    calculateFiatAmount();
  });

  // QR code events
  addClickListener(btnReceive, showQRModal);

  // Crypto selector events
  addClickListener(cryptoSelector, () => {
    showModal("Currency Selection", "Multiple currency support coming soon!");
  });

  // Main actions
  addClickListener(walletButton, toggleWallet);
  addClickListener(sendBtn, sendEth);
  addClickListener(refreshHistoryBtn, displayTransactions);
  addClickListener(downloadAllBtn, downloadTransactions);
  addClickListener(refreshBalanceBtn, updateBalance);

  // Modal controls
  addClickListener(closeModalBtn, hideModal);
  addClickListener(modalOkBtn, hideModal);

  // NEW: Help events
  addClickListener(helpBtn, showHelpModal);
  addClickListener(closeHelpModal, hideHelpModal);
  addClickListener(closeHelpBtn, hideHelpModal);

  // NEW: Profile events
  addClickListener(profileBtn, showProfileModal);
  addClickListener(editProfileBtn, showProfileModal);
  addClickListener(closeProfileModal, hideProfileModal);
  addClickListener(cancelProfileBtn, hideProfileModal);
  addClickListener(saveProfileBtn, saveProfile);

  if (profileUpload) {
    profileUpload.addEventListener("change", handleProfileImageUpload);
  }

  // NEW: Notification events
  addClickListener(notificationsBtn, toggleNotifications);
  addClickListener(closeNotifications, toggleNotifications);
  addClickListener(closeNotificationBtn, () => {
    if (transactionNotification) {
      transactionNotification.classList.remove("translate-x-0");
      transactionNotification.classList.add("translate-x-full");
    }
  });

  // NEW: Network events
  addClickListener(networkSelector, toggleNetworkPanel);

  // NEW: Balance visibility toggle
  addClickListener(toggleBalanceVisibilityBtn, toggleBalanceVisibility);

  // NEW: Password change events
  addClickListener(changePasswordBtn, showChangePasswordModal);
  addClickListener(closeChangePasswordModal, hideChangePasswordModal);
  addClickListener(cancelPasswordChangeBtn, hideChangePasswordModal);
  addClickListener(updatePasswordBtn, updatePassword);

  // NEW: 2FA events
  if (toggle2fa) {
    toggle2fa.addEventListener("change", handle2FAToggle);
  }
  addClickListener(closeTwoFactorModal, hideTwoFactorModal);
  addClickListener(cancelTwoFactorBtn, hideTwoFactorModal);
  addClickListener(verifyTwoFactorBtn, verifyTwoFactor);

  // ENHANCED: Search events
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      performSearch(e.target.value, true); // Pass true for desktop search
    });

    searchInput.addEventListener("focus", () => {
      // Show empty results container on focus if input has value
      if (searchInput.value.trim() && desktopSearchResults) {
        performSearch(searchInput.value.trim(), true);
      }
    });
  }

  addClickListener(mobileSearchBtn, showMobileSearch);
  addClickListener(closeMobileSearch, hideMobileSearch);
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener("input", (e) => {
      performSearch(e.target.value, false); // Pass false for mobile search
    });
  }

  // NEW: Add click listeners to category pills
  if (txCategory) {
    txCategory.forEach((pill) => {
      pill.addEventListener("click", selectTransactionCategory);
      // Store original category for styling
      pill.dataset.category = pill.textContent.trim();
    });
  }

  // Theme selector
  const themeSelectors = document.querySelectorAll(".theme-selector");
  themeSelectors.forEach((selector) => {
    selector.addEventListener("click", () => {
      // Remove active class from all selectors
      themeSelectors.forEach((s) => s.classList.remove("active"));

      // Add active class to clicked selector
      selector.classList.add("active");

      // Apply theme
      const theme = selector.dataset.theme;
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else if (theme === "light") {
        document.documentElement.classList.remove("dark");
      }
    });
  });

  // Receive ETH simulation (to demonstrate notifications)
  setTimeout(() => {
    // Simulate receiving ETH after 10 seconds for demonstration
    if (userProfile.connected) {
      // Add to transaction history with local date
      allTransactions.unshift({
        to: userProfile.address || "0x52676f0b841d7b40740ced9a218de532da9ba640",
        amount: "0.05",
        date: new Date().toLocaleDateString(),
        type: "incoming",
        category: "Transfer",
        note: "Payment received",
      });

      // Add a notification
      addNotification(
        "Transaction Received",
        "You've received 0.05 ETH from John Doe",
        "green"
      );

      // Show transaction notification
      showTransactionNotification(
        "Transaction Received",
        "You've received 0.05 ETH from John Doe",
        "received"
      );

      // Update balance if connected
      if (connected) updateBalance();
    }
  }, 10000);

  // Initialize app
  console.log("Initializing app...");
  if (passwordModal) passwordModal.classList.add("hidden");
  displayTransactions();

  // Initialize notifications - add a welcome notification
  addNotification("Welcome", "Welcome to Chain-Wallet DApp", "blue");

  // Select default transaction category
  if (txCategory && txCategory.length > 0) {
    txCategory[0].click();
  }
});

// Helper function to update balance (global scope for direct access)
function updateBalance() {
  try {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        const signer = provider.getSigner();
        signer
          .getAddress()
          .then((address) => {
            provider
              .getBalance(address)
              .then((balance) => {
                const ethBalance = ethers.utils.formatEther(balance);
                const balanceEl = document.getElementById("account-balance");
                if (balanceEl) {
                  balanceEl.textContent = `${parseFloat(ethBalance).toFixed(
                    4
                  )} ETH`;

                  // Add shimmer effect
                  balanceEl.classList.add("shimmer");
                  setTimeout(() => {
                    balanceEl.classList.remove("shimmer");
                  }, 3000);
                }
              })
              .catch((err) => {
                console.error("Balance fetch error:", err);
              });
          })
          .catch((err) => {
            console.error("Address fetch error:", err);
          });
      } catch (err) {
        console.error("Not connected to wallet:", err);
      }
    }
  } catch (err) {
    console.error("Error fetching balance:", err);
  }
}
// Add direct event listeners for debugging
window.addEventListener("load", function () {
  console.log("Window loaded - adding direct click handlers");

  // Add direct click handlers to important buttons
  const criticalButtons = [
    "walletButton",
    "sendBtn",
    "refreshHistoryBtn",
    "themeToggle",
    "addressBookBtn",
    "addContactBtn",
    "btn-calculator",
    "btn-receive",
    "profileBtn",
    "notificationsBtn",
    "networkSelector",
    "helpBtn",
    "changePasswordBtn",
    "toggle-balance-visibility",
  ];

  criticalButtons.forEach((id) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener("click", function () {
        console.log(`Button #${id} clicked directly!`);
      });
    } else {
      console.warn(`Critical button #${id} not found`);
    }
  });
});
