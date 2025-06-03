// Patient data structure
const patients = [
  {
    id: "1",
    name: "NTEBAN JUNIOR",
    patientId: "FET-MED-FE23A125",
    insurance: "FET Health Insurance",
    policyNumber: "FET2025-001",
    phone: "+237 677 123 456",
    email: "nteban.junior@email.com",
  },
  {
    id: "2",
    name: "MARIE CLAIRE FOTSO",
    patientId: "FET-MED-FE23A126",
    insurance: "Cameroon National Health",
    policyNumber: "CNH2025-002",
    phone: "+237 675 987 654",
    email: "marie.fotso@email.com",
  },
  {
    id: "3",
    name: "PAUL BIYA NGONO",
    patientId: "FET-MED-FE23A127",
    insurance: "CNPS Medical Coverage",
    policyNumber: "CNPS2025-003",
    phone: "+237 678 456 789",
    email: "paul.ngono@email.com",
  },
]

// Updated billing data with patient IDs and CFA amounts
const billingData = [
  // Patient 1 records
  {
    id: "INV-2024-001",
    patientId: "1",
    date: "2024-05-15",
    service: "General Consultation",
    department: "General Medicine",
    total: 61750,
    insurance: 0,
    yourCost: 61750,
    status: "pending",
    type: "consultation",
  },
  {
    id: "INV-2024-002",
    patientId: "1",
    date: "2024-05-15",
    service: "Blood Test - Complete Panel",
    department: "Laboratory",
    total: 87200,
    insurance: 61040,
    yourCost: 26160,
    status: "pending",
    type: "test",
  },
  {
    id: "INV-2024-003",
    patientId: "1",
    date: "2024-05-15",
    service: "Prescription - Antibiotics",
    department: "Pharmacy",
    total: 29080,
    insurance: 20356,
    yourCost: 8724,
    status: "pending",
    type: "medication",
  },
  {
    id: "INV-2024-004",
    patientId: "1",
    date: "2024-05-10",
    service: "X-Ray - Chest",
    department: "Radiology",
    total: 109000,
    insurance: 76300,
    yourCost: 32700,
    status: "pending",
    type: "procedure",
  },
  // Patient 2 records
  {
    id: "INV-2024-005",
    patientId: "2",
    date: "2024-05-20",
    service: "Gynecological Consultation",
    department: "Gynecology",
    total: 69070,
    insurance: 48349,
    yourCost: 20721,
    status: "pending",
    type: "consultation",
  },
  {
    id: "INV-2024-006",
    patientId: "2",
    date: "2024-05-18",
    service: "Ultrasound - Pelvic",
    department: "Radiology",
    total: 130800,
    insurance: 91560,
    yourCost: 39240,
    status: "paid",
    type: "procedure",
  },
  // Patient 3 records
  {
    id: "INV-2024-007",
    patientId: "3",
    date: "2024-05-22",
    service: "Cardiology Consultation",
    department: "Cardiology",
    total: 87200,
    insurance: 61040,
    yourCost: 26160,
    status: "pending",
    type: "consultation",
  },
]

// Global variables
let currentPatientId = "1"
let currentPatient = patients[0]
let currentPatientBilling = []
let currentPage = 1
const itemsPerPage = 10
let filteredData = [...billingData]
let selectedPaymentAmount = 245.0

// DOM Elements
const navLinks = document.querySelectorAll(".nav-link")
const pages = document.querySelectorAll(".page")
const searchInput = document.getElementById("search-input")
const typeFilter = document.getElementById("type-filter")
const statusFilter = document.getElementById("status-filter")
const periodFilter = document.getElementById("period-filter")
const historyTbody = document.getElementById("history-tbody")
const prevBtn = document.getElementById("prev-btn")
const nextBtn = document.getElementById("next-btn")
const paginationText = document.getElementById("pagination-text")
const exportBtn = document.getElementById("export-btn")
const invoiceModal = document.getElementById("invoice-modal")
const paymentConfirmationModal = document.getElementById("payment-confirmation-modal")
const closeModal = document.getElementById("close-modal")
const closeConfirmationModal = document.getElementById("close-confirmation-modal")
const modalBody = document.getElementById("modal-body")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializePaymentForm()
  initializeBillingHistory()
  initializeModals()
})

// Navigation functionality
function initializeNavigation() {
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetPage = this.getAttribute("data-page")
      showPage(targetPage)

      // Update active nav link
      navLinks.forEach((l) => l.classList.remove("active"))
      this.classList.add("active")
    })
  })
}

function showPage(pageId) {
  pages.forEach((page) => {
    page.classList.remove("active")
  })
  document.getElementById(pageId).classList.add("active")

  // Update navigation
  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("data-page") === pageId) {
      link.classList.add("active")
    }
  })
}

// Payment form functionality
function initializePaymentForm() {
  const paymentForm = document.getElementById("payment-form")
  const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]')
  const amountRadios = document.querySelectorAll('input[name="payment-amount"]')
  const customAmountInput = document.getElementById("custom-amount")
  const cardNumberInput = document.getElementById("card-number")
  const expiryInput = document.getElementById("expiry")
  const cvvInput = document.getElementById("cvv")

  // Payment method selection
  paymentMethodRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      const method = this.value

      // Hide all payment details sections
      document.querySelectorAll(".mobile-money-details, .card-details").forEach((el) => {
        el.style.display = "none"
      })

      // Show the selected payment method details
      if (method === "mtn") {
        document.getElementById("mtn-details").style.display = "block"
      } else if (method === "orange") {
        document.getElementById("orange-details").style.display = "block"
      } else if (method === "card") {
        document.getElementById("card-details").style.display = "block"
      }
    })
  })

  // Payment amount selection
  amountRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.value === "full") {
        selectedPaymentAmount = 245.0
        customAmountInput.disabled = true
        customAmountInput.value = ""
      } else if (this.value === "partial") {
        customAmountInput.disabled = false
        customAmountInput.focus()
        selectedPaymentAmount = Number.parseFloat(customAmountInput.value) || 0
      }
      updatePaymentSummary()
    })
  })

  // Custom amount input
  if (customAmountInput) {
    customAmountInput.addEventListener("input", function () {
      const partialRadio = document.querySelector('input[value="partial"]')
      if (partialRadio) {
        partialRadio.checked = true
        selectedPaymentAmount = Number.parseFloat(this.value) || 0
        updatePaymentSummary()
      }
    })
  }

  // Card number formatting
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", (e) => {
      const value = e.target.value.replace(/\s/g, "").replace(/[^0-9]/gi, "")
      const formattedValue = value.match(/.{1,4}/g)?.join(" ") || value
      e.target.value = formattedValue

      // Update card icon based on card type
      updateCardIcon(value)
    })
  }

  // Expiry date formatting
  if (expiryInput) {
    expiryInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4)
      }
      e.target.value = value
    })
  }

  // CVV input restriction
  if (cvvInput) {
    cvvInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "")
    })
  }

  // Form submission
  if (paymentForm) {
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault()
      handlePaymentSubmission()
    })
  }
}

function updateCardIcon(cardNumber) {
  const cardIcon = document.querySelector(".card-icon")
  if (!cardIcon) return

  const firstDigit = cardNumber.charAt(0)

  // Remove all card type classes
  cardIcon.className = "card-icon"

  // Add appropriate card type class
  if (firstDigit === "4") {
    cardIcon.classList.add("fab", "fa-cc-visa")
  } else if (firstDigit === "5") {
    cardIcon.classList.add("fab", "fa-cc-mastercard")
  } else if (firstDigit === "3") {
    cardIcon.classList.add("fab", "fa-cc-amex")
  } else {
    cardIcon.classList.add("fas", "fa-credit-card")
  }
}

// Initialize patient selector
function initializePatientSelector() {
  const patientList = document.getElementById("patient-list")
  const dropdownBtn = document.getElementById("patient-dropdown-btn")
  const dropdownMenu = document.getElementById("patient-dropdown-menu")

  // Populate patient list
  if (patientList) {
    patientList.innerHTML = patients
      .map(
        (patient) => `
      <div class="patient-option" data-patient-id="${patient.id}">
        <div class="patient-avatar-small">
          <i class="fas fa-user"></i>
        </div>
        <div class="patient-details-small">
          <div class="patient-name-small">${patient.name}</div>
          <div class="patient-id-small">${patient.patientId}</div>
        </div>
      </div>
    `,
      )
      .join("")

    // Add click handlers
    patientList.addEventListener("click", (e) => {
      const option = e.target.closest(".patient-option")
      if (option) {
        const patientId = option.getAttribute("data-patient-id")
        switchPatient(patientId)
        dropdownMenu.classList.remove("active")
      }
    })
  }

  // Toggle dropdown
  if (dropdownBtn) {
    dropdownBtn.addEventListener("click", () => {
      dropdownMenu.classList.toggle("active")
    })
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".selector-dropdown")) {
      dropdownMenu.classList.remove("active")
    }
  })
}

// Switch patient function
function switchPatient(patientId) {
  currentPatientId = patientId
  currentPatient = patients.find((p) => p.id === patientId)
  currentPatientBilling = billingData.filter((record) => record.patientId === patientId)

  updatePatientDisplay()
  updateDashboardData()
  renderBillingTable()
  updatePaymentSummary()
}

// Update patient display
function updatePatientDisplay() {
  const elements = {
    "current-patient-name": currentPatient.name,
    "patient-name": currentPatient.name,
    "patient-id": `Patient ID: ${currentPatient.patientId}`,
    "patient-insurance": currentPatient.insurance,
  }

  Object.entries(elements).forEach(([id, value]) => {
    const element = document.getElementById(id)
    if (element) element.textContent = value
  })

  // Update balance and last visit
  const outstandingBalance = currentPatientBilling
    .filter((record) => record.status === "pending")
    .reduce((sum, record) => sum + record.yourCost, 0)

  const lastVisit = currentPatientBilling.sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date

  const balanceElement = document.getElementById("patient-balance")
  if (balanceElement) {
    balanceElement.textContent = `${formatCurrency(outstandingBalance)} CFA`
  }

  const lastVisitElement = document.getElementById("last-visit")
  if (lastVisitElement) {
    lastVisitElement.textContent = lastVisit ? formatDate(lastVisit) : "No visits"
  }
}

// Update dashboard with current patient data
function updateDashboardData() {
  const pendingRecords = currentPatientBilling.filter((record) => record.status === "pending")
  const outstandingBalance = pendingRecords.reduce((sum, record) => sum + record.yourCost, 0)

  // Update outstanding amount
  const amountElement = document.getElementById("outstanding-amount")
  if (amountElement) {
    amountElement.textContent = formatCurrency(outstandingBalance)
  }

  // Update recent services
  const recentServices = currentPatientBilling.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4)

  const servicesContainer = document.querySelector(".services-card .card-content")
  if (servicesContainer) {
    servicesContainer.innerHTML =
      recentServices.length > 0
        ? recentServices
            .map(
              (record) => `
        <div class="service-item">
          <div class="service-info">
            <div class="service-name">${record.service}</div>
            <div class="service-date">${formatDate(record.date)}</div>
          </div>
          <div class="service-amount">${formatCurrency(record.yourCost)} CFA</div>
        </div>
      `,
            )
            .join("") +
          `
        <div class="view-all-link">
          <a href="#history" onclick="showPage('history')">View All Services <i class="fas fa-arrow-right"></i></a>
        </div>
      `
        : '<p class="no-services">No recent services</p>'
  }
}

// Format currency for CFA
function formatCurrency(amount) {
  return new Intl.NumberFormat("fr-FR").format(amount)
}

function updatePaymentSummary() {
  const pendingRecords = currentPatientBilling.filter((record) => record.status === "pending")
  const totalDue = pendingRecords.reduce((sum, record) => sum + record.yourCost, 0)

  const totalAmountElement = document.getElementById("total-amount")
  if (totalAmountElement) {
    totalAmountElement.textContent = `${formatCurrency(selectedPaymentAmount || totalDue)} CFA`
  }

  // Update payment summary services
  const summaryServices = document.querySelector(".summary-services")
  if (summaryServices) {
    const servicesHTML = pendingRecords
      .map(
        (record) => `
      <div class="summary-item">
        <span>${record.service}</span>
        <span>${formatCurrency(record.yourCost)} CFA</span>
      </div>
    `,
      )
      .join("")

    summaryServices.innerHTML = `
      <h4>Outstanding Services</h4>
      ${servicesHTML}
    `
  }
}

function handlePaymentSubmission() {
  const submitBtn = document.querySelector('.payment-form button[type="submit"]')
  const originalText = submitBtn.innerHTML

  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...'
  submitBtn.disabled = true

  // Get selected payment method
  const selectedMethod = document.querySelector('input[name="payment-method"]:checked').value
  let paymentMethodDisplay = ""

  if (selectedMethod === "mtn") {
    paymentMethodDisplay = "MTN Mobile Money (•••• 5678)"
  } else if (selectedMethod === "orange") {
    paymentMethodDisplay = "Orange Money (•••• 9012)"
  } else if (selectedMethod === "card") {
    paymentMethodDisplay = "Visa Card (•••• 4242)"
  }

  // Simulate payment processing
  setTimeout(() => {
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false

    // Show payment confirmation modal
    showPaymentConfirmation(selectedPaymentAmount, paymentMethodDisplay)
  }, 3000)
}

function showPaymentConfirmation(amount, method) {
  const paymentAmountDisplay = document.getElementById("payment-amount-display")
  const transactionId = document.getElementById("transaction-id")
  const paymentDatetime = document.getElementById("payment-datetime")
  const paymentMethodDisplay = document.getElementById("payment-method-display")

  if (paymentAmountDisplay) {
    paymentAmountDisplay.textContent = `$${amount.toFixed(2)}`
  }

  if (transactionId) {
    transactionId.textContent = `TXN-${Date.now()}`
  }

  if (paymentDatetime) {
    const now = new Date()
    paymentDatetime.textContent =
      now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " at " +
      now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
  }

  if (paymentMethodDisplay) {
    paymentMethodDisplay.textContent = method
  }

  showModal(paymentConfirmationModal)
}

// Billing history functionality
function initializeBillingHistory() {
  renderBillingTable()
  setupFilters()
  setupPagination()
  setupExport()
}

function setupFilters() {
  if (searchInput) {
    searchInput.addEventListener("input", debounce(filterData, 300))
  }

  if (typeFilter) {
    typeFilter.addEventListener("change", filterData)
  }

  if (statusFilter) {
    statusFilter.addEventListener("change", filterData)
  }

  if (periodFilter) {
    periodFilter.addEventListener("change", filterData)
  }
}

function filterData() {
  const searchTerm = searchInput?.value.toLowerCase() || ""
  const typeValue = typeFilter?.value || ""
  const statusValue = statusFilter?.value || ""
  const periodValue = periodFilter?.value || ""

  filteredData = billingData.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm) ||
      item.service.toLowerCase().includes(searchTerm) ||
      item.department.toLowerCase().includes(searchTerm)

    const matchesType = !typeValue || item.type === typeValue
    const matchesStatus = !statusValue || item.status === statusValue
    const matchesPeriod = !periodValue || checkPeriodMatch(item.date, periodValue)

    return matchesSearch && matchesType && matchesStatus && matchesPeriod
  })

  currentPage = 1
  renderBillingTable()
  updatePagination()
}

function checkPeriodMatch(itemDate, period) {
  const date = new Date(itemDate)
  const now = new Date()

  switch (period) {
    case "last-month":
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      return date >= lastMonth
    case "last-3-months":
      const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1)
      return date >= threeMonthsAgo
    case "last-year":
      const lastYear = new Date(now.getFullYear() - 1, 0, 1)
      return date >= lastYear
    default:
      return true
  }
}

function renderBillingTable() {
  if (!historyTbody) return

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const pageData = currentPatientBilling.slice(startIndex, endIndex)

  historyTbody.innerHTML = pageData
    .map(
      (item) => `
        <tr>
            <td><strong>${item.id}</strong></td>
            <td>${formatDate(item.date)}</td>
            <td>${item.service}</td>
            <td>${item.department}</td>
            <td>${formatCurrency(item.total)} CFA</td>
            <td>${formatCurrency(item.insurance)} CFA</td>
            <td><strong>${formatCurrency(item.yourCost)} CFA</strong></td>
            <td><span class="status-badge status-${item.status}">${formatStatus(item.status)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn" onclick="viewInvoice('${item.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="action-btn" onclick="downloadInvoice('${item.id}')">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </td>
        </tr>
    `,
    )
    .join("")
}

function formatStatus(status) {
  const statusMap = {
    paid: "Paid",
    pending: "Pending",
    covered: "Insurance Covered",
  }
  return statusMap[status] || status
}

function setupPagination() {
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--
        renderBillingTable()
        updatePagination()
      }
    })
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(filteredData.length / itemsPerPage)
      if (currentPage < totalPages) {
        currentPage++
        renderBillingTable()
        updatePagination()
      }
    })
  }
}

function updatePagination() {
  const totalItems = filteredData.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  if (paginationText) {
    paginationText.textContent = `Showing ${startItem}-${endItem} of ${totalItems}`
  }

  if (prevBtn) {
    prevBtn.disabled = currentPage === 1
  }

  if (nextBtn) {
    nextBtn.disabled = currentPage === totalPages || totalPages === 0
  }
}

function setupExport() {
  if (exportBtn) {
    exportBtn.addEventListener("click", exportData)
  }
}

function exportData() {
  const csvContent = generateCSV(filteredData)
  downloadCSV(csvContent, "patient-billing-history.csv")
}

function generateCSV(data) {
  const headers = ["Invoice #", "Date", "Service", "Department", "Total", "Insurance", "Your Cost", "Status", "Type"]
  const csvRows = [headers.join(",")]

  data.forEach((item) => {
    const row = [
      item.id,
      item.date,
      `"${item.service}"`,
      `"${item.department}"`,
      item.total.toFixed(2),
      item.insurance.toFixed(2),
      item.yourCost.toFixed(2),
      item.status,
      item.type,
    ]
    csvRows.push(row.join(","))
  })

  return csvRows.join("\n")
}

function downloadCSV(content, filename) {
  const blob = new Blob([content], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

// Modal functionality
function initializeModals() {
  if (closeModal) {
    closeModal.addEventListener("click", () => hideModal(invoiceModal))
  }

  if (closeConfirmationModal) {
    closeConfirmationModal.addEventListener("click", () => hideModal(paymentConfirmationModal))
  }

  if (invoiceModal) {
    invoiceModal.addEventListener("click", (e) => {
      if (e.target === invoiceModal) {
        hideModal(invoiceModal)
      }
    })
  }

  if (paymentConfirmationModal) {
    paymentConfirmationModal.addEventListener("click", (e) => {
      if (e.target === paymentConfirmationModal) {
        hideModal(paymentConfirmationModal)
      }
    })
  }

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (invoiceModal?.classList.contains("active")) {
        hideModal(invoiceModal)
      }
      if (paymentConfirmationModal?.classList.contains("active")) {
        hideModal(paymentConfirmationModal)
      }
    }
  })

  // Payment confirmation modal buttons
  const downloadReceiptBtn = document.getElementById("download-receipt-btn")
  const backToDashboardBtn = document.getElementById("back-to-dashboard-btn")

  if (downloadReceiptBtn) {
    downloadReceiptBtn.addEventListener("click", () => {
      alert("Receipt downloaded successfully!")
    })
  }

  if (backToDashboardBtn) {
    backToDashboardBtn.addEventListener("click", () => {
      hideModal(paymentConfirmationModal)
      showPage("dashboard")
    })
  }
}

function viewInvoice(invoiceId) {
  const invoice = billingData.find((item) => item.id === invoiceId)
  if (!invoice) return

  const invoiceHTML = `
        <div class="invoice-details">
            <div class="invoice-header">
                <h4>Invoice ${invoice.id}</h4>
                <span class="status-badge status-${invoice.status}">${formatStatus(invoice.status)}</span>
            </div>
            <div class="invoice-info">
                <div class="info-row">
                    <span class="label">Date:</span>
                    <span class="value">${formatDate(invoice.date)}</span>
                </div>
                <div class="info-row">
                    <span class="label">Service:</span>
                    <span class="value">${invoice.service}</span>
                </div>
                <div class="info-row">
                    <span class="label">Department:</span>
                    <span class="value">${invoice.department}</span>
                </div>
                <div class="info-row">
                    <span class="label">Total Amount:</span>
                    <span class="value">$${invoice.total.toFixed(2)}</span>
                </div>
                <div class="info-row">
                    <span class="label">Insurance Covered:</span>
                    <span class="value">$${invoice.insurance.toFixed(2)}</span>
                </div>
                <div class="info-row">
                    <span class="label">Your Responsibility:</span>
                    <span class="value"><strong>$${invoice.yourCost.toFixed(2)}</strong></span>
                </div>
            </div>
            <div class="invoice-actions">
                <button class="btn btn-primary" onclick="downloadInvoice('${invoice.id}')">
                    <i class="fas fa-download"></i> Download PDF
                </button>
                <button class="btn btn-outline" onclick="hideModal(invoiceModal)">Close</button>
            </div>
        </div>
    `

  if (modalBody) {
    modalBody.innerHTML = invoiceHTML
  }
  showModal(invoiceModal)
}

function downloadInvoice(invoiceId) {
  // Simulate PDF download
  alert(`Downloading invoice ${invoiceId}...`)
}

function showModal(modal) {
  if (modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  }
}

function hideModal(modal) {
  if (modal) {
    modal.classList.remove("active")
    document.body.style.overflow = ""
  }
}

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Set initial payment amount
  updatePaymentSummary()

  // Render initial billing history
  renderBillingTable()
  updatePagination()
})

// Update initialization
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation()
  initializePatientSelector()
  initializePaymentForm()
  initializeBillingHistory()
  initializeModals()

  // Initialize with first patient
  switchPatient("1")
})
