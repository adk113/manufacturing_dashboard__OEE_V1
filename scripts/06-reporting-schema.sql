-- Reporting and Analytics Schema

-- Report Definitions
CREATE TABLE report_definitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    modules VARCHAR(255)[], -- Array of modules included
    report_type VARCHAR(50), -- 'standard', 'custom', 'scheduled'
    query_template TEXT,
    parameters JSONB,
    created_by VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scheduled Reports
CREATE TABLE scheduled_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_definition_id UUID REFERENCES report_definitions(id),
    schedule_expression VARCHAR(100), -- Cron expression
    recipients TEXT[], -- Array of email addresses
    format VARCHAR(20), -- 'pdf', 'excel', 'csv'
    last_run_at TIMESTAMP,
    next_run_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Report Execution Log
CREATE TABLE report_executions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_definition_id UUID REFERENCES report_definitions(id),
    scheduled_report_id UUID REFERENCES scheduled_reports(id),
    execution_status VARCHAR(20), -- 'success', 'failed', 'running'
    file_path VARCHAR(500),
    execution_time_ms INTEGER,
    error_message TEXT,
    executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
